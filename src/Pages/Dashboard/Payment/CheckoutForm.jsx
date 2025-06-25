import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !element) {
      return;
    }

    const card = element.getElement(CardElement);

    if (!card) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if(error){
      setError(error.message);
    }
    else{
      setError("");
      console.log("paymentMethod", paymentMethod);
    }

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded"></CardElement>
      <button
        className="btn btn-primary w-full text-black"
        type="submit"
        disabled={!stripe}
      >
        pay for parcel
      </button>
      {
        error && <p className="text-red-500">{error}</p>
      }
    </form>
  );
};

export default CheckoutForm;
