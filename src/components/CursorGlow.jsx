import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* OUTER GLOW RING */}
      <div
        className="fixed top-0 left-0 z-[999] pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 14}px, ${position.y - 14}px)`,
        }}
      >
        <div className="w-7 h-7 rounded-full border border-green-400/70 shadow-[0_0_16px_#22ff88]" />
      </div>

      {/* INNER DOT */}
      <div
        className="fixed top-0 left-0 z-[999] pointer-events-none"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_18px_#22ff88]" />
      </div>
    </>
  );
}