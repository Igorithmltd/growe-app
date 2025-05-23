import GroupDetailsLayout from "@/src/layouts/dashboard/savings/group/group-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Group",
};

const SavingsPage = () => {
  return <GroupDetailsLayout />;
};

export default SavingsPage;
