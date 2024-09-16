import { ProfilePopover, Text } from "@/component";
import { useUser } from "@/hooks";

const Header = () => {
  const { user } = useUser();

  const unAuthContainer = !user && (
    <Text level="p" className="paragraph text-greyDark">
      Login
    </Text>
  );

  const authContainer = user && <ProfilePopover />;
  return (
    <header className="px-4 py-1 border w-full ">
      <div className="flex sm:gap-0 items-center justify-between mx-auto">
        <Text level="h3" className="heading-3 text-greyDark">
         MyArticles
        </Text>
        {unAuthContainer}
        {authContainer}
      </div>
    </header>
  );
};

export default Header;
