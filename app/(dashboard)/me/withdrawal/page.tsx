import WithdrawFundsLayout from "@/src/layouts/dashboard/account/withdrawal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Withdrwal Settings",
};

const WithdrawalPage = () => {
  return <WithdrawFundsLayout />;
};

export default WithdrawalPage;
