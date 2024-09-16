import { useState } from "react";
import { useUser } from "@/hooks";
import { Text, Image, Button } from "@/component";

const ProfilePopover = () => {
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      {/* Profile Image */}
      <div
        className="cursor-pointer flex items-center"
        onClick={toggleDropdown}
      >
        <Image
          src="/profile-user.svg"
          alt={user?.username || "User Avatar"}
          className="rounded-full h-12 w-12"
          fullHeight={false}
          fullWidth={false}
        />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <div className="flex flex-col p-2">
            <Text level="p" className="paragraph text-greyDark">
              {user?.username || "Unknown User"}
            </Text>
            <Button
              variant="PRIMARY"
              size="sm"
              onClick={logout}
              className="mt-2 transition"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;
