import QuickSavingLayout from "@/src/layouts/dashboard/savings/personal/quick-saving";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings | Quick Savings",
};

const QuickSavingsPage = () => {
  return <QuickSavingLayout />;
};

export default QuickSavingsPage;
