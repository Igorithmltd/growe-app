import BiometricLayout from "@/src/layouts/dashboard/account/security/biometric";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Biometric Setup",
};

const BiometricPage = () => {
  return <BiometricLayout />;
};

export default BiometricPage;
