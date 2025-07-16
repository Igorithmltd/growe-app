import CreateNoteLayout from "@/src/layouts/dashboard/finance-notes/create-note";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Finance Notes",
};

const CreateNotesPage = () => {
  return <CreateNoteLayout />;
};

export default CreateNotesPage;
