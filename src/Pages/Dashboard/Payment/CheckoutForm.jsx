import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const {id} = useParams();
  const axiosSecure = useAxiosSecure();

  const {isPending, data: parcelInfo = {}} = useQuery({
    queryKey: ['parcels', id],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/parcels/${id}`)
      return data;
    }
  })

  if(isPending){
    return <span>Loading...</span>
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount*100;
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

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

    // Create payment intent
    const {data} = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      id
    })

    const clientSecret = data?.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

     if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        console.log(result);
      }
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
        Pay ${amount}
      </button>
      {
        error && <p className="text-red-500">{error}</p>
      }
    </form>
  );
};

export default CheckoutForm;
