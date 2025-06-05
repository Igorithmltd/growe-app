import PersonalInvestmentsLayout from "@/src/layouts/dashboard/investments/personal/active-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Personal Investments",
};

const InvestmentsPage = () => {
  return <PersonalInvestmentsLayout />;
};

export default InvestmentsPage;
