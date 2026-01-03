import InvestmentPerformance from "@/src/layouts/dashboard/investments/performance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investments Performance",
};

const InvestmentsPerformancePage = () => {
  return <InvestmentPerformance />;
};

export default InvestmentsPerformancePage;
