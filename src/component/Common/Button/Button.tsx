import { ButtonProps } from "@/interfaces";

const Button = ({
  variant,
  onClick,
  className,
  children,
  size = "lg",
}: ButtonProps) => {
  let styling = "";

  if (variant === "PRIMARY") {
    styling += "bg-secondary hover:bg-orange-700 text-white";
  } else if (variant === "SECONDARY")
    styling += "bg-white hover:bg-primary text-black hover:text-white border";
  else if (variant === "SQUARE") styling += "text-black leading-none";

  if (size === "lg") styling += " py-2 px-4";
  else if (size === "md") styling += " p-2";
  else if (size === "sm") styling += " px-2 py-1";
  else if (size === "xsm") styling += " p-1";
  return (
    <button
      onClick={onClick}
      className={`${styling} strong-text rounded shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
