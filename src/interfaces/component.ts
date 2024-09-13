import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface ButtonProps {
  variant: "PRIMARY" | "SECONDARY" | "SQUARE";
  size?: "sm" | "md" | "lg" | "xsm";
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface InputFieldProps {
  type: HTMLInputTypeAttribute;
  value: string | number | undefined;
  className?: string;
  disabled?: boolean;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export interface TextProps {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
  variant?: "ERROR" | "MESSAGE";
  children: React.ReactNode;
  className?: string;
  textCenter?: boolean;
}

export interface LinkProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: "BLANK";
  active?: boolean;
  onClick?: () => void;
}
