import PaymentForm from "@/src/layouts/dashboard/investments/group/active-groups/details/invest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Invest",
};

const InvestmentsPage = () => {
  return <PaymentForm />;
};

export default InvestmentsPage;
