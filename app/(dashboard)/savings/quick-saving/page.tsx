import QuickSavingLayout from "@/src/layouts/dashboard/savings/personal/quick-saving";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings | Quick Savings",
};

const SavingsPage = () => {
  return <QuickSavingLayout />;
};

export default SavingsPage;
