import { Text } from '..';

const Footer = () => {
  return (
    <footer className='bg-black px-4 py-1 fixed w-full bottom-0'>
      <div className='flex sm:gap-0 items-center justify-between mx-auto'>
        <Text level='p' className='pre-title text-primary'>
          MyArticles
        </Text>
        <Text level='p' className='pre-title text-white'>
          Made with ❤️ in 🇮🇳
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
