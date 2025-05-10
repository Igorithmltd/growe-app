import DashboardHome from "@/src/layouts/dashboard/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Home",
};

const HomePage = () => {
  return <DashboardHome />;
};

export default HomePage;
