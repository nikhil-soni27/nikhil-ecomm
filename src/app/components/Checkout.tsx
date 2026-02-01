import React, { useState } from "react";
import { ChevronLeft, CreditCard, Lock } from "lucide-react";
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
      <div className="min-h-screen bg-[#FFF8E7] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="bg-white p-12 rounded-3xl shadow-2xl"
            style={{
              border: "4px solid #D4703B",
              borderRadius: "40px 10px 40px 10px",
            }}
          >
            <div className="w-24 h-24 bg-[#D4703B] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✓</span>
            </div>

            <h1 className="font-['Amatic_SC'] text-6xl font-bold text-[#3A5A40] mb-4">
              Thank You!
            </h1>

            <p className="font-['Josefin_Sans'] text-lg text-[#3A5A40]/80 mb-8">
              Your order has been placed successfully. The artisans are excited
              to create your unique pieces!
            </p>

            <div
              className="bg-[#F4ACB7]/20 p-6 rounded-xl mb-8"
              style={{
                border: "2px dashed #D4703B",
                borderRadius: "20px 5px 20px 5px",
              }}
            >
              <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2">
                Order Number:{" "}
                <span className="font-bold">
                  #{Math.floor(Math.random() * 100000)}
                </span>
              </p>
              <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                Estimated delivery:{" "}
                <span className="font-bold">5-7 business days</span>
              </p>
            </div>

            <button
              onClick={onBackClick}
              className="bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl"
              style={{
                border: "3px solid #3A5A40",
                borderRadius: "20px 5px 20px 5px",
              }}
            >
              Continue Shopping
            </button>

            <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/60 mt-6">
              A confirmation email has been sent to {shippingInfo.email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 mb-8 text-[#3A5A40] hover:text-[#D4703B] transition-colors duration-300"
        >
          <ChevronLeft size={20} />
          <span className="font-['Josefin_Sans'] text-sm">Back to Shop</span>
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${step === "shipping" ? "text-[#D4703B]" : "text-[#3A5A40]"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-['Josefin_Sans'] font-bold ${
                  step === "shipping"
                    ? "bg-[#D4703B] text-[#FFF8E7]"
                    : "bg-[#3A5A40] text-[#FFF8E7]"
                }`}
              >
                1
              </div>
              <span className="font-['Josefin_Sans'] text-sm">Shipping</span>
            </div>

            <div className="w-16 h-0.5 bg-[#3A5A40]/20"></div>

            <div
              className={`flex items-center space-x-2 ${step === "payment" ? "text-[#D4703B]" : "text-[#3A5A40]/50"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-['Josefin_Sans'] font-bold ${
                  step === "payment"
                    ? "bg-[#D4703B] text-[#FFF8E7]"
                    : "bg-[#3A5A40]/20 text-[#3A5A40]"
                }`}
              >
                2
              </div>
              <span className="font-['Josefin_Sans'] text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="md:col-span-2">
            {step === "shipping" && (
              <form
                onSubmit={handleSubmitShipping}
                className="bg-white p-8 rounded-3xl shadow-xl"
                style={{
                  border: "3px solid #3A5A40",
                  borderRadius: "30px 10px 30px 10px",
                }}
              >
                <h2 className="font-['Amatic_SC'] text-3xl sm:text-4xl font-bold text-[#3A5A40] mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        Full Name *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        Email *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Address *
                    </label>
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                      style={{ borderRadius: "12px 3px 12px 3px" }}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        City *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        State *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        ZIP Code *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl"
                  style={{
                    border: "3px solid #3A5A40",
                    borderRadius: "20px 5px 20px 5px",
                  }}
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <form
                onSubmit={handleSubmitPayment}
                className="bg-white p-8 rounded-3xl shadow-xl"
                style={{
                  border: "3px solid #3A5A40",
                  borderRadius: "30px 10px 30px 10px",
                }}
              >
                <h2 className="font-['Amatic_SC'] text-4xl font-bold text-[#3A5A40] mb-6">
                  Payment Information
                </h2>

                <div
                  className="bg-[#F4ACB7]/10 p-4 rounded-xl mb-6 flex items-center space-x-3"
                  style={{
                    border: "2px solid #D4703B",
                    borderRadius: "15px 5px 15px 5px",
                  }}
                >
                  <Lock size={20} className="text-[#D4703B]" />
                  <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]">
                    Your payment information is secure and encrypted
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Card Number *
                    </label>
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                      style={{ borderRadius: "12px 3px 12px 3px" }}
                    />
                  </div>

                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Cardholder Name *
                    </label>
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                      style={{ borderRadius: "12px 3px 12px 3px" }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        Expiry Date *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        CVV *
                      </label>
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm"
                        style={{ borderRadius: "12px 3px 12px 3px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="flex-1 bg-white text-[#3A5A40] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#F4ACB7]/30 transition-all duration-300 border-2 border-[#3A5A40]/20"
                    style={{ borderRadius: "20px 5px 20px 5px" }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
                    style={{
                      border: "3px solid #3A5A40",
                      borderRadius: "20px 5px 20px 5px",
                    }}
                  >
                    <CreditCard size={20} />
                    <span>Place Order</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div
            className="bg-white p-6 rounded-3xl shadow-xl h-fit lg:sticky lg:top-24"
            style={{
              border: "3px solid #3A5A40",
              borderRadius: "25px 5px 25px 5px",
            }}
          >
            <h3 className="font-['Amatic_SC'] text-3xl font-bold text-[#3A5A40] mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.customization)}`}
                  className="flex space-x-3"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-['Josefin_Sans'] text-sm font-medium text-[#3A5A40]">
                      {item.name}
                    </p>
                    <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/60">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-['Josefin_Sans'] text-sm font-bold text-[#3A5A40]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-[#3A5A40]/10 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                  Subtotal
                </span>
                <span className="font-['Josefin_Sans'] text-sm font-medium text-[#3A5A40]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                  Shipping
                </span>
                <span className="font-['Josefin_Sans'] text-sm font-medium text-[#3A5A40]">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                  Tax
                </span>
                <span className="font-['Josefin_Sans'] text-sm font-medium text-[#3A5A40]">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-[#3A5A40]/10 pt-2 flex justify-between">
                <span className="font-['Amatic_SC'] text-2xl font-bold text-[#3A5A40]">
                  Total
                </span>
                <span className="font-['Amatic_SC'] text-3xl font-bold text-[#D4703B]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
