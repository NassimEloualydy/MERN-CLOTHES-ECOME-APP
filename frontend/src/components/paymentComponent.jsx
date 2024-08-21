import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';


const PaymentComponent = () => {
  const stripe = useStripe();
  const elements = useElements();

  const confirmPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      'pi_3PolLQHcKVRDweYX1LSITitI_secret_wOVyxtmFJUpaAk4j7LBM7Gkcw',
      {
        payment_method: {
          us_bank_account: {
            routing_number: '110000000',
            account_number: '000123456789',
            account_holder_type: 'individual',
          },
          billing_details: {
            name: 'Jenny Rosen',
            email: 'jenny@example.com',
          },
        },
      }
    );

    if (error) {
      console.log("Payment failed:", error);
    } else {
      console.log("Payment successful:", paymentIntent);
    }
  };

  return (
    <form onSubmit={confirmPayment}>
      <PaymentElement />
      <button className="btn btn-dark mt-3" type="submit">Submit</button>
    </form>
  );
};

const App = async () => {
const stripePromise = await loadStripe("pk_test_51Pn4iDHcKVRDweYXVWq8IY9iemhtaWDhGZB08n2317nf67GfNd4VtwWVMcx000EQkyX8diAwBJDLKZahXjueWPBM00uk4ALoRS");
const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_3Pn6FbHcKVRDweYX0Om9vCI2_secret_6eda67rfcSo8oQOCnJ0DHbIx6',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentComponent />
    </Elements>
  );
};

export default App;
