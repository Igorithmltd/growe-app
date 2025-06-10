import Account from "@/src/layouts/dashboard/account/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Home",
};

const AccountPage = () => {
  return <Account />;
};

export default AccountPage;
