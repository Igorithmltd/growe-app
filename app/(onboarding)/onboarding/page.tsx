import { OnboardingLayout } from "@/src/layouts/onboarding/carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Get Started",
};

const OnboardingPage = () => {
  return <OnboardingLayout />;
};

export default OnboardingPage;
