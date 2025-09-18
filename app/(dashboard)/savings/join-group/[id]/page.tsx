import GroupPreviewLayout from "@/src/layouts/dashboard/savings/group/join-group/group-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Join Savings Group",
};

const SavingsGroupPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <GroupPreviewLayout id={id} />;
};

export default SavingsGroupPage;
