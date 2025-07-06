"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const fallbackImage = "/images/fallback.webp";

export default function ImageWithFallback({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: any) {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
}
