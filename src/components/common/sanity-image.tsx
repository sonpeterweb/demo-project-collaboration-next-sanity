import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

import { urlFor } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";

type ImageFit = "crop" | "max" | "min" | "fill";

type SanityImageProps = {
  image: SanityImageSource;
  alt: string;
  width: number;
  height?: number;
  fit?: ImageFit;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
};

function buildSanityImageUrl({
  image,
  width,
  height,
  fit,
  quality = 80,
}: Pick<SanityImageProps, "image" | "width" | "height" | "fit" | "quality">) {
  let builder = urlFor(image).width(width).quality(quality);

  if (height) {
    builder = builder.height(height);
  }

  if (fit) {
    builder = builder.fit(fit);
  }

  return builder.url();
}

export function SanityImage({
  image,
  alt,
  width,
  height = width,
  fit = "crop",
  className,
  sizes,
  priority = false,
  quality,
}: SanityImageProps) {
  const src = buildSanityImageUrl({ image, width, height, fit, quality });

  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      sizes={sizes ?? `(max-width: 768px) 100vw, ${width}px`}
      priority={priority}
    />
  );
}
