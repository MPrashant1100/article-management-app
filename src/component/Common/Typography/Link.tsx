import Link from 'next/link';
import { LinkProps } from '@/interfaces';

const LinkText = ({
  href = '',
  children,
  className,
  target,
  active = true,
  onClick,
}: LinkProps) => {
  return (
    <Link
      className={`${className} link ${!active && 'disabled'}`}
      href={href}
      target={target}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkText;
