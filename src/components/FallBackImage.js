import Image from "next/image";
import { useState } from "react";

export default function FallbackImage({ src, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/chicken pizza.jpg")}
    />
  );
}