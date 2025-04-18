import { Loader } from "@/src/components";
import BVNLayout from "@/src/layouts/kyc/bvn";
import NINLayout from "@/src/layouts/kyc/nin";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Growe | KYC",
};

interface PageParams {
  mode: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

const VerificationPage = async ({ params }: PageProps) => {
  const { mode } = await params;
  const isBvn = mode === "bvn";

  return <Suspense fallback={<Loader />}>{isBvn ? <BVNLayout /> : <NINLayout />}</Suspense>;
};

export default VerificationPage;
