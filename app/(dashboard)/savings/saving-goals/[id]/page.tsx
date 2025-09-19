import SavingDetailsLayout from "@/src/layouts/dashboard/savings/personal/savings-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Goal",
};

const SavingsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <SavingDetailsLayout id={id} />;
};

export default SavingsPage;
