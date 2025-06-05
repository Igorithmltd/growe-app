import InvestForm from "@/src/layouts/dashboard/investments/suggested-investments/details/invest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Invest",
};

const InvestmentsPage = () => {
  return <InvestForm />;
};

export default InvestmentsPage;
