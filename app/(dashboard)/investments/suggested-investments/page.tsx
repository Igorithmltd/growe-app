import SuggestedInvestmentsLayout from "@/src/layouts/dashboard/investments/suggested-investments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Suggested Investments",
};

const InvestmentsPage = () => {
  return <SuggestedInvestmentsLayout />;
};

export default InvestmentsPage;
