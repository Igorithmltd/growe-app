import DisbursementLayout from "@/src/layouts/dashboard/savings/group/joined-group/group-detail/disburse";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Savings Disbyrsement",
};

const TopUpPage = () => {
  return <DisbursementLayout />;
};

export default TopUpPage;
