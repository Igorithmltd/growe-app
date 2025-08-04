import BreakSavingsLayout from "@/src/layouts/dashboard/savings/personal/break-savings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Break Savings",
};

const TopUpPage = () => {
  return <BreakSavingsLayout />;
};

export default TopUpPage;
