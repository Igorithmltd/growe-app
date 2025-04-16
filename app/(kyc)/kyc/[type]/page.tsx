import BVNLayout from "@/src/layouts/kyc/bvn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | KYC | BVN",
};

const BVNPage = ({ params: { type } }: { params: { type: string } }) => {
  return <BVNLayout />;
};

export default BVNPage;
