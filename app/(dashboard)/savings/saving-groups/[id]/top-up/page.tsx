import TopUpLayout from "@/src/layouts/dashboard/payment/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Top Up",
};

const TopUpPage = () => {
  return <TopUpLayout />;
};

export default TopUpPage;
