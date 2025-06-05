import InvestmentGroupTerms from "@/src/layouts/dashboard/investments/group/joined-group copy/terms-conditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Terms & Conditions",
};

const InvestmentTermsPage = () => {
  return <InvestmentGroupTerms />;
};

export default InvestmentTermsPage;
