import SavingGoalList from "@/src/layouts/dashboard/savings/personal/saving-goals-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Goals",
};

const SavingsGoalPage = () => {
  return <SavingGoalList />;
};

export default SavingsGoalPage;
