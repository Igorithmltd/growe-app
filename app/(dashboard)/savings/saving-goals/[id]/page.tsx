import SavingsLayout from "@/src/layouts/dashboard/savings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Goal",
};

const SavingsPage = () => {
  return <SavingsLayout />;
};

export default SavingsPage;
