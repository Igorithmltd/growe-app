import ChangePasswordLayout from "@/src/layouts/dashboard/account/security/change-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Change Password",
};

const ChangePasswordPage = () => {
  return <ChangePasswordLayout />;
};

export default ChangePasswordPage;
