import { EmailVerificationForm } from "@/src/layouts//auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Verify Email",
};

const VerificationPage = () => {
  return <EmailVerificationForm />;
};

export default VerificationPage;
