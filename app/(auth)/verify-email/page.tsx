import { EmailVerificationForm } from "@/src/layouts/onboarding/auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Verify Email",
};

const OnboardingPage = () => {
  return <EmailVerificationForm />;
};

export default OnboardingPage;
