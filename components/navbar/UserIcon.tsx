import { fetchProfileImage } from "@/utils/actions";
import { LuUser } from "react-icons/lu";

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="user-profile-image"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }
  return <LuUser className="h-6 w-6 rounded-full text-white bg-primary" />;
};

export default UserIcon;
