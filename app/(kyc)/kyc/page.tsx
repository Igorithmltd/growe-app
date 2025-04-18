import { Loader } from "@/src/components";
import KycLayout from "@/src/layouts/kyc";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Growe | KYC",
};

const KycPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <KycLayout />
    </Suspense>
  );
};

export default KycPage;
