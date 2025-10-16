import JoinedInvestmentDetailsLayout from "@/src/layouts/dashboard/investments/group/active-groups/details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Group",
};

const InvestmentsGroupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <JoinedInvestmentDetailsLayout id={id} />;
};

export default InvestmentsGroupPage;
