// Razorpay SDK loader and checkout helper

declare global {
  interface Window {
    Razorpay: any;
  }
}

let scriptLoaded = false;

export function loadRazorpayScript(): Promise<boolean> {
  if (scriptLoaded && window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      scriptLoaded = true;
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => { scriptLoaded = true; resolve(true); };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayCheckoutOptions {
  razorpayKeyId: string;
  orderId: string;
  amount: number; // in paise
  currency: string;
  packageTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  onSuccess: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  onFailure: (error: any) => void;
}

export function openRazorpayCheckout(opts: RazorpayCheckoutOptions) {
  const options = {
    key: opts.razorpayKeyId,
    amount: opts.amount,
    currency: opts.currency || "INR",
    name: "BatoiBhai",
    description: `Booking: ${opts.packageTitle}`,
    order_id: opts.orderId,
    handler: (response: any) => {
      opts.onSuccess({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    prefill: {
      name: opts.userName,
      email: opts.userEmail,
      contact: opts.userPhone,
    },
    theme: {
      color: "hsl(192, 70%, 28%)",
    },
    modal: {
      ondismiss: () => {
        opts.onFailure({ reason: "Payment cancelled by user" });
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (response: any) => {
    opts.onFailure(response.error);
  });
  rzp.open();
}
