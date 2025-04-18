import KycLayout from "@/src/layouts/kyc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | KYC",
};

const KycPage = () => {
  return <KycLayout />;
};

export default KycPage;
