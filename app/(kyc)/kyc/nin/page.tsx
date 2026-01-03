import NINLayout from "@/src/layouts/kyc/nin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | KYC | NIN",
};

const NINPage = async () => {
  return <NINLayout />;
};

export default NINPage;
