import SavingDetailsLayout from "@/src/layouts/dashboard/savings/personal/savings-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Goal",
};

const SavingsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <SavingDetailsLayout id={id} />;
};

export default SavingsPage;
