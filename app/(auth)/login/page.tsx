import LoginLayout from "@/src/layouts/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Sign In",
};

const LoginPage = () => {
  return <LoginLayout />;
};

export default LoginPage;
