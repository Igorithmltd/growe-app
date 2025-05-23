import JoinedGroupsLayout from "@/src/layouts/dashboard/savings/group/joined-group";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Groups",
};

const ActivePage = () => {
  return <JoinedGroupsLayout />;
};

export default ActivePage;
