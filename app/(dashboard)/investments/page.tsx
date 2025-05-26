import InvestmentLayout from "@/src/layouts/dashboard/investments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investments",
};

const InvestmentsPage = () => {
  return <InvestmentLayout />;
};

export default InvestmentsPage;
