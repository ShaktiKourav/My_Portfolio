import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
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
    <div
      className="fixed top-0 left-0 pointer-events-none z-[1] transition-transform duration-300 ease-out"
      style={{
        transform: `translate(${position.x - 200}px, ${position.y - 200}px)`,
      }}
    >
      {/* MAIN GLOW */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-green-400/10 blur-[120px]" />

      {/* INNER LIGHT */}
      <div className="absolute left-[90px] top-[90px] w-[220px] h-[220px] rounded-full bg-emerald-300/10 blur-[80px]" />

      {/* CORE LIGHT */}
      <div className="absolute left-[155px] top-[155px] w-[90px] h-[90px] rounded-full bg-green-300/20 blur-[35px]" />
    </div>
  );
}