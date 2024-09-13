import { ImageContainerProps } from "@/interfaces";
import Image from "next/image";

const ImageContainer = ({
  src,
  alt = "",
  className,
  loading = "lazy",
  fullHeight = true,
  fullWidth = true,
}: ImageContainerProps) => {
  return (
    <div
      className={`${className} ${fullWidth && "w-full"} ${
        fullHeight && "h-full"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        loading={loading}
        className={`${className} image`}
      />
    </div>
  );
};

export default ImageContainer;
