"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  width: number;
  height: number;
}

const fallbackImage = "/images/fallback.webp";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f1f5f9" offset="20%" />
      <stop stop-color="#e2e8f0" offset="50%" />
      <stop stop-color="#f1f5f9" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f1f5f9" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="0.5s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function CustomImage({ src, width, height, ...props }: Props) {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <>
      <Image
        priority
        alt="thumbnail"
        src={error ? fallbackImage : src}
        width={width}
        height={height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(width, height)
        )}`}
        onError={() => setError}
        {...props}
      />
    </>
  );
}
