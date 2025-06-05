import JoinInvestmentsGroupsLayout from "@/src/layouts/dashboard/investments/group/join-group";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Join Investment Group",
};

const JoinGroupPage = () => {
  return <JoinInvestmentsGroupsLayout />;
};

export default JoinGroupPage;
