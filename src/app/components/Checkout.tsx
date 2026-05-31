import React, { useState } from "react";
import { ChevronLeft, CreditCard, Lock, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { CartItem, User } from "@/app/App";
import { toast } from "sonner";

interface CheckoutProps {
  cart: CartItem[];
  onBackClick: () => void;
  user: User | null;
}

export function Checkout({ cart, onBackClick, user }: CheckoutProps) {
  const [step, setStep] = useState<"shipping" | "payment" | "complete">(
    "shipping",
  );
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 75 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Stripe
    toast.success("Order placed successfully!");
    setStep("complete");
  };

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-[#F9F5EE] py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="overflow-hidden rounded-[32px] bg-[#FAF7F2] px-8 py-12 shadow-[0_32px_80px_rgba(71,56,38,0.14)] ring-1 ring-[#A8927B]/20">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#9CAF88]/10 text-[#3A5A40] shadow-inner">
              <Sparkles size={32} />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[#3A5A40] sm:text-5xl font-['Cormorant_Garamond']">
              Thank you for your order
            </h1>

            <p className="mt-4 text-base leading-7 text-[#A8927B] font-['Lora']">
              Your order has been received and will be prepared with care.
              We&apos;ve notified the artisan so your handcrafted pieces can be
              shipped soon.
            </p>

            <div className="mt-8 rounded-3xl border border-[#A8927B]/20 bg-[#F4E9DD] p-6">
              <p className="text-sm text-[#A8927B] font-['Lora']">
                Order Number
              </p>
              <p className="mt-1 text-lg font-semibold text-[#3A5A40]">
                #{Math.floor(Math.random() * 100000)}
              </p>
              <p className="mt-4 text-sm text-[#A8927B] font-['Lora']">
                Estimated delivery:{" "}
                <span className="font-semibold text-[#3A5A40]">
                  5-7 business days
                </span>
              </p>
            </div>

            <button
              onClick={onBackClick}
              className="mt-10 inline-flex rounded-[24px] bg-[#9CAF88] px-8 py-4 text-base font-semibold text-[#FAF7F2] shadow-lg transition hover:bg-[#7EA474] font-['Lora']"
            >
              Continue shopping
            </button>

            <p className="mt-6 text-sm text-[#A8927B] font-['Lora']">
              A confirmation email has been sent to {shippingInfo.email}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5EE] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <button
          onClick={onBackClick}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#3A5A40] transition hover:text-[#9CAF88] font-['Lora']"
        >
          <ChevronLeft size={20} />
          Back to shop
        </button>

        <div className="mb-12 rounded-[32px] bg-[#FAF7F2] p-5 shadow-[0_24px_60px_rgba(71,56,38,0.12)] ring-1 ring-[#A8927B]/20">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#A8927B] font-['Lora']">
                Checkout
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#3A5A40] sm:text-3xl font-['Cormorant_Garamond']">
                Secure checkout
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:auto-cols-auto sm:grid-flow-col">
              <div className="rounded-2xl border border-[#A8927B]/20 bg-[#F4E9DD] px-4 py-3 text-center">
                <p className="text-xs text-[#A8927B] font-['Lora']">Shipping</p>
                <p className="mt-2 text-lg font-semibold text-[#3A5A40]">
                  Step 1
                </p>
              </div>
              <div className="rounded-2xl border border-[#A8927B]/20 bg-[#F4E9DD] px-4 py-3 text-center">
                <p className="text-xs text-[#A8927B] font-['Lora']">Payment</p>
                <p className="mt-2 text-lg font-semibold text-[#3A5A40]">
                  Step 2
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.65fr_0.95fr]">
          <div>
            {step === "shipping" && (
              <form
                onSubmit={handleSubmitShipping}
                className="rounded-[32px] bg-[#FAF7F2] p-8 shadow-[0_24px_60px_rgba(71,56,38,0.12)] ring-1 ring-[#A8927B]/20"
              >
                <h3 className="text-3xl font-semibold text-[#3A5A40] mb-6 font-['Cormorant_Garamond']">
                  Shipping information
                </h3>

                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      Full Name *
                      <input
                        type="text"
                        required
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      Email *
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                    Address *
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                    />
                  </label>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      City *
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      State *
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      ZIP Code *
                      <input
                        type="text"
                        required
                        value={shippingInfo.zip}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zip: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-[24px] bg-[#9CAF88] px-8 py-4 text-base font-semibold text-[#FAF7F2] shadow-lg transition hover:bg-[#7EA474] font-['Lora']"
                >
                  Continue to payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <form
                onSubmit={handleSubmitPayment}
                className="rounded-[32px] bg-[#FAF7F2] p-8 shadow-[0_24px_60px_rgba(71,56,38,0.12)] ring-1 ring-[#A8927B]/20"
              >
                <h3 className="text-3xl font-semibold text-[#3A5A40] mb-6 font-['Cormorant_Garamond']">
                  Payment information
                </h3>

                <div className="mb-6 rounded-3xl border border-[#D4703B]/20 bg-[#FFF1EC] px-4 py-4 text-sm text-[#3A5A40] font-['Lora']">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-[#D4703B]" />
                    <span>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                    Card number *
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                    Cardholder name *
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      Expiry date *
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiry: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#3A5A40] font-['Lora']">
                      CVV *
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="rounded-[24px] border border-[#A8927B]/20 bg-white px-8 py-4 text-base font-semibold text-[#3A5A40] transition hover:bg-[#FAF7F2] font-['Lora']"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#3A5A40] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#2F4A32]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <CreditCard size={18} /> Place order
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-[#A8927B]/20 bg-[#FAF7F2] p-6 shadow-[0_24px_60px_rgba(71,56,38,0.12)] lg:sticky lg:top-24">
              <h3 className="text-2xl font-semibold text-[#3A5A40] mb-5 font-['Cormorant_Garamond']">
                Order summary
              </h3>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${JSON.stringify(item.customization)}`}
                    className="flex items-center gap-3"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-3xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#3A5A40] font-['Lora']">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#A8927B] font-['Lora']">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#3A5A40]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-[#A8927B]/20 pt-4 text-sm text-[#3A5A40] font-['Lora']">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#3A5A40]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-[#3A5A40]">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-[#3A5A40]">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#A8927B]/20 pt-4 text-xl font-semibold text-[#3A5A40] font-['Lora']">
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping === 0 && (
              <div className="rounded-[32px] border border-[#9CAF88]/25 bg-[#eff6ee] px-5 py-4 text-sm text-[#3A5A40]">
                Congratulations — you qualified for free shipping!
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
