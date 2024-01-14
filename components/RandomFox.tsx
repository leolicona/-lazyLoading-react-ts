import { use, useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImage = {
  src: string;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImage & ImageNative;

export const LazyImage = ({ src, ...imageProps}: Props): JSX.Element => {
  const [currentSrc, setCurrentSrc] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  const node = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setCurrentSrc(src);
        }
      });
    });
    // ComponentDidMount
    if (node.current) {
      observer.observe(node.current);
    }
    // ComponentWillUnmount
    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={node}
      src={src}
      {...imageProps}
    />
  );
};
