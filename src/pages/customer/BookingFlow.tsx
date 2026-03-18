import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { usePublicData } from "@/hooks/useBackendData";
import { paymentApi, type PaymentOrderRecord } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon, Users, CheckCircle, ArrowRight, ArrowLeft,
  MapPin, Clock, Shield, CreditCard, Phone, Mail, User, Tag,
  AlertCircle, Smartphone, Building, Globe
} from "lucide-react";
import { Stepper, Step, StepLabel, Chip, Snackbar, Alert } from "@mui/material";

const steps = ["Select Package", "Traveler Details", "Review & Pay"];

const paymentMethods = [
  { id: "UPI", label: "UPI", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { id: "NetBanking", label: "Net Banking", icon: Building, desc: "All major banks" },
  { id: "DebitCard", label: "Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "CreditCard", label: "Credit Card", icon: Globe, desc: "No-cost EMI available" },
];
type BookingPackage = ReturnType<typeof usePublicData>["packages"][number];

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: { color: string };
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function BookingFlow() {
  const { packages, offers } = usePublicData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageId = Number(searchParams.get("package")) || 1;
  const selectedPackage: BookingPackage = packages.find((pkg) => pkg.id === packageId) || packages[0];

  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof offers[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", specialRequests: "", idType: "Aadhaar", idNumber: "" });
  const [booked, setBooked] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<PaymentOrderRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" as "error" | "success" });

  const basePrice = selectedPackage.price * travelers;
  const discount = appliedCoupon ? Math.round(basePrice * appliedCoupon.discount / 100) : 0;
  const gst = Math.round((basePrice - discount) * 0.05);
  const totalPrice = basePrice - discount + gst;

  const applyCoupon = () => {
    const found = offers.find(o => o.code === coupon.toUpperCase());
    if (found) { setAppliedCoupon(found); setSnackbar({ open: true, message: `Coupon ${found.code} applied! ${found.discount}% off`, severity: "success" }); }
    else setSnackbar({ open: true, message: "Invalid coupon code", severity: "error" });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (activeStep === 0 && !date) newErrors.date = "Please select a travel date";
    if (activeStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
      if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (activeStep < 2) {
      setActiveStep(a => a + 1);
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setSnackbar({ open: true, message: "Failed to load Razorpay SDK", severity: "error" });
      return;
    }

    setProcessingPayment(true);

    try {
      const createOrderRes = await paymentApi.createOrder({
        packageId: selectedPackage.apiId,
        numberOfTravelers: travelers,
      });

      if (!createOrderRes.success || !createOrderRes.data) {
        setSnackbar({ open: true, message: createOrderRes.message || "Failed to create order", severity: "error" });
        setProcessingPayment(false);
        return;
      }

      const orderData: PaymentOrderRecord = createOrderRes.data;
      const RazorpayCtor = window.Razorpay;
      if (!RazorpayCtor) {
        setSnackbar({ open: true, message: "Razorpay is unavailable right now", severity: "error" });
        setProcessingPayment(false);
        return;
      }
      const razorpay = new RazorpayCtor({
        key: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BatoiBhai",
        description: `Booking for ${orderData.packageTitle}`,
        order_id: orderData.orderId,
        handler: async (response: RazorpaySuccessResponse) => {
          const verifyRes = await paymentApi.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: orderData.bookingId,
            paymentId: orderData.paymentId,
          });

          if (!verifyRes.success) {
            setSnackbar({ open: true, message: verifyRes.message || "Payment verification failed", severity: "error" });
            setProcessingPayment(false);
            return;
          }

          setConfirmedBooking(orderData);
          setBooked(true);
          setProcessingPayment(false);
          setSnackbar({ open: true, message: "Payment successful and booking confirmed", severity: "success" });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          bookingId: orderData.bookingId,
          packageId: selectedPackage.apiId,
          travelers: String(travelers),
        },
        theme: { color: "#0B5A75" },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false);
            setSnackbar({ open: true, message: "Payment cancelled", severity: "error" });
          },
        },
      });

      razorpay.open();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Unable to process payment",
        severity: "error",
      });
      setProcessingPayment(false);
    }
  };
  const handleBack = () => setActiveStep(a => a - 1);

  if (booked) {
    const bookingId = confirmedBooking?.bookingCode || `BK-${String(Math.floor(Math.random() * 9000 + 1000))}`;
    return (
      <PanelLayout panel="customer">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border rounded-2xl p-10 text-center max-w-md w-full">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
            </motion.div>
            <h2 className="font-display text-2xl font-bold mb-2">Booking Confirmed! 🎉</h2>
            <p className="text-muted-foreground mb-2">Your booking for <strong>{selectedPackage.name}</strong> has been confirmed.</p>
            <Chip label={`Booking ID: ${bookingId}`} sx={{ fontFamily: "monospace", fontWeight: 700, mb: 3, bgcolor: "hsl(192,70%,28%,0.1)", color: "hsl(192,70%,28%)" }} />

            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Package</span><span className="font-medium">{selectedPackage.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="font-medium">{date ? format(date, "PPP") : "TBD"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Travelers</span><span className="font-medium">{travelers}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-medium">{paymentMethod}</span></div>
              {appliedCoupon && <div className="flex justify-between text-sm text-success"><span>Discount ({appliedCoupon.code})</span><span>-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-sm border-t pt-2 font-bold"><span>Total Paid</span><span className="text-primary">₹{totalPrice.toLocaleString()}</span></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/customer/bookings")}>View Bookings</Button>
              <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => navigate("/customer")}>Explore More</Button>
            </div>
          </motion.div>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout panel="customer">
      <PageHeader title="Book Your Trip" subtitle={selectedPackage.name} />

      <div className="mb-8">
        <Stepper activeStep={activeStep} alternativeLabel sx={{
          "& .MuiStepLabel-label": { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 },
          "& .MuiStepIcon-root.Mui-active": { color: "hsl(192, 70%, 28%)" },
          "& .MuiStepIcon-root.Mui-completed": { color: "hsl(152, 60%, 40%)" },
        }}>
          {steps.map(label => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
        </Stepper>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{selectedPackage.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedPackage.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max {selectedPackage.maxPeople}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedPackage.partner}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedPackage.includes.map(inc => (<Chip key={inc} label={inc} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 10, height: 22 }} />))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <Label className="font-display font-semibold mb-3 block">Select Travel Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full sm:w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground", errors.date && "border-destructive")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setErrors(e => ({ ...e, date: "" })); }} initialFocus className={cn("p-3 pointer-events-auto")} disabled={(d) => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <Label className="font-display font-semibold mb-3 block">Number of Travelers</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setTravelers(Math.max(1, travelers - 1))} disabled={travelers <= 1}>-</Button>
                    <span className="text-3xl font-bold font-display w-14 text-center">{travelers}</span>
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setTravelers(Math.min(selectedPackage.maxPeople, travelers + 1))} disabled={travelers >= selectedPackage.maxPeople}>+</Button>
                    <span className="text-sm text-muted-foreground">Max {selectedPackage.maxPeople} persons</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card border rounded-xl p-6 space-y-5">
                <h3 className="font-display font-semibold text-lg">Traveler Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block text-sm">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Enter full name" className={cn("pl-10", errors.name && "border-destructive")} value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); setErrors(er => ({ ...er, name: "" })); }} />
                    </div>
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="email@example.com" className={cn("pl-10", errors.email && "border-destructive")} type="email" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setErrors(er => ({ ...er, email: "" })); }} />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="+91 9XXXXXXXXX" className={cn("pl-10", errors.phone && "border-destructive")} value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); setErrors(er => ({ ...er, phone: "" })); }} />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">ID Type</Label>
                    <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={formData.idType} onChange={e => setFormData({ ...formData, idType: e.target.value })}>
                      <option>Aadhaar</option>
                      <option>PAN Card</option>
                      <option>Passport</option>
                      <option>Driving License</option>
                    </select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">ID Number *</Label>
                    <Input placeholder="Enter ID number" className={cn(errors.idNumber && "border-destructive")} value={formData.idNumber} onChange={e => { setFormData({ ...formData, idNumber: e.target.value }); setErrors(er => ({ ...er, idNumber: "" })); }} />
                    {errors.idNumber && <p className="text-xs text-destructive mt-1">{errors.idNumber}</p>}
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Special Requests</Label>
                    <Input placeholder="Dietary or accessibility needs" value={formData.specialRequests} onChange={e => setFormData({ ...formData, specialRequests: e.target.value })} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    {[
                      ["Package", selectedPackage.name],
                      ["Duration", selectedPackage.duration],
                      ["Travel Date", date ? format(date, "PPP") : "—"],
                      ["Travelers", `${travelers} persons`],
                      ["Lead Traveler", formData.name || "—"],
                      ["Contact", formData.email || "—"],
                      ["Phone", formData.phone || "—"],
                      ["ID", `${formData.idType}: ${formData.idNumber || "—"}`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2 border-b last:border-b-0">
                        <span className="text-muted-foreground text-sm">{label}</span>
                        <span className="font-medium text-sm text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-accent" /> Apply Coupon</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="flex-1" />
                    <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-3 p-3 bg-success/10 rounded-lg flex items-center gap-2 text-sm text-success">
                      <CheckCircle className="w-4 h-4" /> <strong>{appliedCoupon.code}</strong> applied! {appliedCoupon.discount}% off
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {offers.map(o => (
                      <button key={o.id} onClick={() => { setCoupon(o.code); setAppliedCoupon(o); setSnackbar({ open: true, message: `Coupon ${o.code} applied!`, severity: "success" }); }}
                        className="text-xs border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors font-medium">
                        <strong className="text-accent">{o.code}</strong> — {o.discount}% off
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-display font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`border-2 rounded-xl p-4 text-left transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            <m.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{m.label}</p>
                            <p className="text-xs text-muted-foreground">{m.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button onClick={handleNext} disabled={processingPayment} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              {activeStep === 2 ? (
                <><Shield className="w-4 h-4 mr-1" /> {processingPayment ? "Processing..." : `Confirm & Pay ₹${totalPrice.toLocaleString()}`}</>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
        </div>

        {/* Price sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl p-6 sticky top-20">
            <h3 className="font-display font-semibold mb-4">Price Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">₹{selectedPackage.price.toLocaleString()} × {travelers} travelers</span><span>₹{basePrice.toLocaleString()}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-success"><span>Discount ({appliedCoupon.discount}%)</span><span>-₹{discount.toLocaleString()}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>₹{gst.toLocaleString()}</span></div>
              <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span className="text-primary">₹{totalPrice.toLocaleString()}</span></div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="p-3 bg-success/10 rounded-lg flex items-start gap-2">
                <Shield className="w-4 h-4 text-success mt-0.5 shrink-0" />
                <p className="text-xs text-success">Free cancellation up to 48 hours before travel. 100% refund guaranteed.</p>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>✓ Includes: {selectedPackage.includes.join(", ")}</p>
                <p>✓ Partner: {selectedPackage.partner}</p>
                <p>✓ {selectedPackage.duration}</p>
                <p>✓ 24/7 Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
