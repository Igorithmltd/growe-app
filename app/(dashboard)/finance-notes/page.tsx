import FinanceNotesLayout from "@/src/layouts/dashboard/finance-notes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Finance Notes",
};

const FinanceNotesPage = () => {
  return <FinanceNotesLayout />;
};

export default FinanceNotesPage;
