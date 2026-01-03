import Account from "@/src/layouts/dashboard/account/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | My Account",
};

const AccountPage = () => {
  return <Account />;
};

export default AccountPage;
