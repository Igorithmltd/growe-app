import GroupDetailsLayout from "@/src/layouts/dashboard/savings/group/joined-group/group-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Group",
};

const SavingsGroupPage = () => {
  return <GroupDetailsLayout />;
};

export default SavingsGroupPage;
