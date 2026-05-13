"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Providers({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);

  return (
    <ReactLenis root>
      <motion.div 
        className="fixed w-6 h-6 border-2 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      {children}
    </ReactLenis>
  );
}
