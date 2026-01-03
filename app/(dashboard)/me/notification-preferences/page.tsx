import NotificationPreferencesLayout from "@/src/layouts/dashboard/account/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Notification Preferences",
};

const HelpSupportPage = () => {
  return <NotificationPreferencesLayout />;
};

export default HelpSupportPage;
