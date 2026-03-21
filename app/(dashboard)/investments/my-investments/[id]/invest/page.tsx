import InvestForm from "@/src/layouts/dashboard/investments/suggested-investments/details/invest";
import TopUpLayout from "@/src/layouts/dashboard/payment/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Invest",
};

const InvestmentsPage = () => {
  return <TopUpLayout />;
};

export default InvestmentsPage;
