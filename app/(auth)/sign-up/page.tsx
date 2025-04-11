import SignupLayout from "@/src/layouts/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Sign Up",
};

const SignUpPage = () => {
  return <SignupLayout />;
};

export default SignUpPage;
