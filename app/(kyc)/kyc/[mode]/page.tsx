import BVNLayout from "@/src/layouts/kyc/bvn";
import NINLayout from "@/src/layouts/kyc/nin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | KYC",
};

const BVNPage = async ({ params }: { params: { mode: string } }) => {
  const { mode } = await params;
  const isBvn = mode === "bvn";

  return isBvn ? <BVNLayout /> : <NINLayout />;
};

export default BVNPage;
