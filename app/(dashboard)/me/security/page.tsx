import SecurityLayout from "@/src/layouts/dashboard/account/security";
import WithdrawFundsLayout from "@/src/layouts/dashboard/account/withdrawal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Security Settings",
};

const SecurityPage = () => {
  return <SecurityLayout />;
};

export default SecurityPage;
