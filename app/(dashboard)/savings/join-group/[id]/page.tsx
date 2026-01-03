import GroupPreviewLayout from "@/src/layouts/dashboard/savings/group/join-group/group-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Join Savings Group",
};

export default async function SavingsGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GroupPreviewLayout id={id} />;
}
