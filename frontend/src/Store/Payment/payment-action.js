import { setPaymentDetails } from "./payment-slice";
import { CardNumberElement } from "@stripe/react-stripe-js";
import axios from "axios";

export const processPayment = ({
  totalAmount,
  stripe,
  elements,
  checkinDate,
  checkoutDate,
  propertyName,
  address,
  maximumGuest,
  bookingId,
  propertyId,
  nights,
  dispatch,
  navigate,
}) => {
  return async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("stripe is not initialized");
      return;
    }
    const CardNumberElement = elements.getElement(CardNumberElement);
    try {
      const response = await axios(
        "/api/v1/rent/user/checkout-session",
        {
          amount: totalAmount,
          currency: "inr",
          paymentMethodTypes: ["card"],
          checkinDate,
          checkoutDate,
          propertyName,
          address,
          maximumGuest,
          bookingId,
          propertyId,
          nights,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: CardNumberElement,
        },
      });
      dispatch(
        setPaymentDetails({
          checkinDate,
          checkoutDate,
          totalPrice: totalAmount,
          propertyName,
          address,
          maximumGuest,
          nights,
        })
      );
      navigate("/user/booking");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
};
