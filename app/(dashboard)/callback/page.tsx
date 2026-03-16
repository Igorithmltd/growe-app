import PaymentCallback from "@/src/layouts/dashboard/payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Payment Response",
};

const PaymentCallbackPage = () => {
  return <PaymentCallback />;
};

export default PaymentCallbackPage;
