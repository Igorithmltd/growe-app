import SavingDetailsLayout from "@/src/layouts/dashboard/savings/personal/savings-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Goal",
};

const SavingsPage = () => {
  return <SavingDetailsLayout />;
};

export default SavingsPage;
