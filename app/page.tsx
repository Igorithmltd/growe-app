import { Metadata } from "next";
import LandingLayout from "@/src/layouts/landing-page";

export const metadata: Metadata = {
  title: "Growe | Home",
};

const LandingPage = () => {
  return <LandingLayout />;
};

export default LandingPage;
