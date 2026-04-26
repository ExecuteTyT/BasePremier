import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/cn";

// 1×1 transparent PNG — shows page bg (dark) while loading
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

type Props = ImageProps & {
  className?: string;
};

export function NextImage({
  alt,
  className,
  placeholder = "blur",
  blurDataURL,
  priority = false,
  ...rest
}: Props) {
  const resolvedBlurDataURL = placeholder === "blur" && !blurDataURL ? BLUR_DATA_URL : blurDataURL;

  return (
    <Image
      alt={alt}
      className={cn("object-cover", className)}
      placeholder={placeholder}
      blurDataURL={resolvedBlurDataURL}
      priority={priority}
      {...rest}
    />
  );
}
