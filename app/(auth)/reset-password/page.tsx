import ResetPasswordForm from "@/src/layouts/auth/reset-password";
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader } from "@/src/components";

export const metadata: Metadata = {
  title: "Growe | Reset Password",
};

const VerificationPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default VerificationPage;
