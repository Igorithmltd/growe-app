import JoinedInvestmentsGroupsLayout from "@/src/layouts/dashboard/investments/group/active-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Investment Groups",
};

const JoinGroupPage = () => {
  return <JoinedInvestmentsGroupsLayout />;
};

export default JoinGroupPage;
