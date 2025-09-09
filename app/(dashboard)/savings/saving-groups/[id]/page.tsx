import GroupDetailsLayout from "@/src/layouts/dashboard/savings/group/joined-group/group-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Group",
};

const SavingsGroupPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <GroupDetailsLayout id={id} />;
};

export default SavingsGroupPage;
