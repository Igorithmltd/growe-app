import EditProfile from "@/src/layouts/dashboard/account/profle/edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Edit Profile",
};

const EditProfilePage = () => {
  return <EditProfile />;
};

export default EditProfilePage;
