import JoinPreviewDetailsLayout from "@/src/layouts/dashboard/investments/group/join-group/details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Join Investment Group",
};

const SavingsGroupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <JoinPreviewDetailsLayout id={id} />;
};

export default SavingsGroupPage;
