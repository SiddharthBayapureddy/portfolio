"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  const mouse = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.12;
      current.current.y += (mouse.current.y - current.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [isTouchDevice]);

  const [clickScale, setClickScale] = useState(false);
  useEffect(() => {
    if (isClicking) {
      setClickScale(true);
      const timer = setTimeout(() => setClickScale(false), 80);
      return () => clearTimeout(timer);
    }
  }, [isClicking]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      <div
        className="rounded-full bg-white transition-all ease-out mix-blend-difference"
        style={{
          width: "6px",
          height: "6px",
          marginTop: "-3px",
          marginLeft: "-3px",
          opacity: isHovering ? 0.3 : 0.6,
          transform: `scale(${clickScale ? 1.5 : isHovering ? 2 : 1})`,
          transitionDuration: clickScale ? '80ms' : '150ms'
        }}
      />
    </div>
  );
}
