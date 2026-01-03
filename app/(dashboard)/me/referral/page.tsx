import ReferralLayout from "@/src/layouts/dashboard/account/referral";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Referral Program",
};

const ReferralPage = () => {
  return <ReferralLayout />;
};

export default ReferralPage;
