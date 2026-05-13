import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GREEN = "rgba(0,255,65,0.95)";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const rawPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, label');
      const canvas3d = target.closest("canvas");
      setIsPointer(!!clickable && !canvas3d);
      setIs3D(!!canvas3d);
    };

    const tick = () => {
      setPos((prev) => ({
        x: prev.x + (rawPos.current.x - prev.x) * 0.18,
        y: prev.y + (rawPos.current.y - prev.y) * 0.18,
      }));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", () => setVisible(false));
    document.documentElement.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const size = is3D ? 44 : isPointer ? 18 : 16;
  const LINE = "3px";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          opacity: visible ? 1 : 0,
          width: size,
          height: size,
        }}
        transition={{ type: "tween", duration: 0 }}
        style={{ position: "fixed" }}
      >
        {is3D ? (
          <div style={{ width: size, height: size, border: `${LINE} solid ${GREEN}`, borderRadius: "50%", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: -10, width: 7, height: 2, background: GREEN, transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", right: -10, width: 7, height: 2, background: GREEN, transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: -10, height: 7, width: 2, background: GREEN, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", bottom: -10, height: 7, width: 2, background: GREEN, transform: "translateX(-50%)" }} />
          </div>
        ) : (
          <div style={{ position: "relative", width: size, height: size }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: GREEN, transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: GREEN, transform: "translateX(-50%)" }} />
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4, height: 4, background: GREEN,
            }} />
          </div>
        )}
      </motion.div>
    </>
  );
}
