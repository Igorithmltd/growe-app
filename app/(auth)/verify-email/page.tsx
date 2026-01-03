import { EmailVerificationForm } from "@/src/layouts//auth/verify-email";
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader } from "@/src/components";

export const metadata: Metadata = {
  title: "Growe | Verify Email",
};

const VerificationPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default VerificationPage;
