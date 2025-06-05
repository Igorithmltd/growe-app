import JoinedInvestmentDetailsLayout from "@/src/layouts/dashboard/investments/group/joined-group/details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Group",
};

const InvestmentsGroupPage = () => {
  return <JoinedInvestmentDetailsLayout />;
};

export default InvestmentsGroupPage;
