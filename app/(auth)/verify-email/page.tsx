import { EmailVerificationForm } from "@/src/layouts//auth/verify-email";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Verify Email",
};

const VerificationPage = () => {
  return (
    <Suspense fallback={<Spinner color="primary" size="xl" />}>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default VerificationPage;
