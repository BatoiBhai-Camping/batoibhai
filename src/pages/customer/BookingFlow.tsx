import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { packages, offers } from "@/data/dummyData";
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
  MapPin, Clock, Shield, CreditCard, Phone, Mail, User, Tag, Percent, Wallet
} from "lucide-react";
import { Chip, Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Select Package", "Traveler Details", "Review & Pay"];

export default function BookingFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageId = Number(searchParams.get("package")) || 1;
  const selectedPackage = packages.find(p => p.id === packageId) || packages[0];

  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof offers[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", specialRequests: "", idType: "Aadhaar", idNumber: ""
  });
  const [booked, setBooked] = useState(false);

  const basePrice = selectedPackage.price * travelers;
  const discount = appliedCoupon ? Math.round(basePrice * appliedCoupon.discount / 100) : 0;
  const gst = Math.round((basePrice - discount) * 0.05);
  const totalPrice = basePrice - discount + gst;

  const applyCoupon = () => {
    const found = offers.find(o => o.code === coupon.toUpperCase());
    if (found) setAppliedCoupon(found);
  };

  const handleNext = () => {
    if (activeStep < 2) setActiveStep(a => a + 1);
    else setBooked(true);
  };
  const handleBack = () => setActiveStep(a => a - 1);

  if (booked) {
    return (
      <PanelLayout panel="customer">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border rounded-2xl p-10 text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Booking Confirmed! 🎉</h2>
            <p className="text-muted-foreground mb-2">Your booking for <strong>{selectedPackage.name}</strong> has been confirmed.</p>
            <p className="text-sm text-muted-foreground mb-6">Booking ID: <span className="font-mono font-semibold">BK-{String(Math.floor(Math.random() * 9000 + 1000))}</span></p>
            <div className="bg-muted rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Package</span><span className="font-medium">{selectedPackage.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="font-medium">{date ? format(date, "PPP") : "TBD"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Travelers</span><span className="font-medium">{travelers}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-medium">{paymentMethod}</span></div>
              {appliedCoupon && <div className="flex justify-between text-sm text-success"><span>Discount ({appliedCoupon.code})</span><span>-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-sm font-semibold border-t pt-2"><span>Total Paid</span><span className="text-primary">₹{totalPrice.toLocaleString()}</span></div>
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
                  <h3 className="font-display font-semibold text-lg mb-2">{selectedPackage.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedPackage.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max {selectedPackage.maxPeople} people</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedPackage.partner}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">{selectedPackage.includes.map(inc => (<span key={inc} className="badge-info">{inc}</span>))}</div>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <Label className="font-display font-semibold mb-3 block">Select Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full sm:w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} disabled={(d) => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <Label className="font-display font-semibold mb-3 block">Number of Travelers</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(1, travelers - 1))} disabled={travelers <= 1}>-</Button>
                    <span className="text-2xl font-bold font-display w-12 text-center">{travelers}</span>
                    <Button variant="outline" size="icon" onClick={() => setTravelers(Math.min(selectedPackage.maxPeople, travelers + 1))} disabled={travelers >= selectedPackage.maxPeople}>+</Button>
                    <span className="text-sm text-muted-foreground">Max {selectedPackage.maxPeople}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card border rounded-xl p-6 space-y-5">
                <h3 className="font-display font-semibold text-lg">Traveler Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block text-sm">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Enter full name" className="pl-10" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="email@example.com" className="pl-10" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="+91 9XXXXXXXXX" className="pl-10" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
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
                    <Label className="mb-1.5 block text-sm">ID Number</Label>
                    <Input placeholder="Enter ID number" value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} />
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
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Package</span><span className="font-medium">{selectedPackage.name}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Duration</span><span>{selectedPackage.duration}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Travel Date</span><span>{date ? format(date, "PPP") : "Not selected"}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Travelers</span><span>{travelers}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Traveler Name</span><span>{formData.name || "—"}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Contact</span><span>{formData.email || "—"}</span></div>
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
                      <CheckCircle className="w-4 h-4" /> Coupon <strong>{appliedCoupon.code}</strong> applied! {appliedCoupon.discount}% off
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {offers.map(o => (
                      <button key={o.id} onClick={() => { setCoupon(o.code); setAppliedCoupon(o); }} className="text-xs border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                        <strong>{o.code}</strong> - {o.discount}% off
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-display font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["UPI", "PhonePe", "Net Banking", "Debit Card"].map(m => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`border-2 rounded-xl p-4 text-center transition-colors ${paymentMethod === m ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                      >
                        <Wallet className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                        <span className="text-xs font-medium">{m}</span>
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
            <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {activeStep === 2 ? "Confirm & Pay" : "Continue"} {activeStep < 2 && <ArrowRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Price sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl p-6 sticky top-6">
            <h3 className="font-display font-semibold mb-4">Price Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Base price × {travelers}</span><span>₹{basePrice.toLocaleString()}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-success"><span>Discount ({appliedCoupon.discount}%)</span><span>-₹{discount.toLocaleString()}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>₹{gst.toLocaleString()}</span></div>
              <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span className="text-primary">₹{totalPrice.toLocaleString()}</span></div>
            </div>
            <div className="mt-5 p-3 bg-success/10 rounded-lg flex items-start gap-2">
              <Shield className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-xs text-success">Free cancellation up to 48 hours before travel date. 100% refund guaranteed.</p>
            </div>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <p>✓ Includes: {selectedPackage.includes.join(", ")}</p>
              <p>✓ Partner: {selectedPackage.partner}</p>
              <p>✓ {selectedPackage.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
