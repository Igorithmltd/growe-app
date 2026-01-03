import CreateGroupLayout from "@/src/layouts/dashboard/savings/group/create-group";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Create Saving Group",
};

const CreateGroupPage = () => {
  return <CreateGroupLayout />;
};

export default CreateGroupPage;
