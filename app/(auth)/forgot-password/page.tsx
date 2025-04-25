import { ForgotPasswordForm } from "@/src/layouts/auth/forgot-password";
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader } from "@/src/components";

export const metadata: Metadata = {
  title: "Growe | Forgot Password",
};

const VerificationPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ForgotPasswordForm />
    </Suspense>
  );
};

export default VerificationPage;
