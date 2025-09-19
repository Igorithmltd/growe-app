import BreakSavingsLayout from "@/src/layouts/dashboard/savings/personal/break-savings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Break Savings",
};

const BreakSavingsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <BreakSavingsLayout id={id} />;
};

export default BreakSavingsPage;
