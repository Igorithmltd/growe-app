import InvestmentGroupTerms from "@/src/layouts/dashboard/investments/group/join-group/terms-conditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Terms & Conditions",
};

const InvestmentTermsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <InvestmentGroupTerms id={id} />;
};

export default InvestmentTermsPage;
