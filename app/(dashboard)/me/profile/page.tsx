import ProfileLayout from "@/src/layouts/dashboard/account/profle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | My Profile",
};

const ProfilePage = () => {
  return <ProfileLayout />;
};

export default ProfilePage;
