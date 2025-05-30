import CreateInvestmentGroupLayout from "@/src/layouts/dashboard/investments/group/create-group";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Create Investment Group",
};

const CreateGroupPage = () => {
  return <CreateInvestmentGroupLayout />;
};

export default CreateGroupPage;
