import WithdrawFundsLayout from "@/src/layouts/dashboard/account/withdrawal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Withdrawal Settings",
};

const WithdrawalPage = () => {
  return <WithdrawFundsLayout />;
};

export default WithdrawalPage;
