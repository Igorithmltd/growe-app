import SuggestedDetailsLayout from "@/src/layouts/dashboard/investments/suggested-investments/group-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Info",
};

const InvestmentsPage = () => {
  return <SuggestedDetailsLayout />;
};

export default InvestmentsPage;
