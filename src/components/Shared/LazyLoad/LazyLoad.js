import React, { useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

export default function LazyLoad({
  tag = "div",
  children,
  style,
  className,
  root,
  threshold,
  rootMargin,
  forward,
}) {
  const Tag = tag;
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(
    ref,
    {
      root: root ?? null,
      threshold: threshold ?? 0.5,
      rootMargin: rootMargin,
    },
    forward
  );

  return (
    <Tag
      ref={ref}
      style={style}
      className={`w-100 ${className}`}
      children={isIntersecting ? children : null}
    />
  );
}
