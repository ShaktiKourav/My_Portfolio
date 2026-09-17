const particles = [
  { top: "12%", left: "18%", delay: "0s", duration: "4s" },
  { top: "22%", left: "72%", delay: "0.5s", duration: "5s" },
  { top: "35%", left: "45%", delay: "1s", duration: "4.5s" },
  { top: "48%", left: "82%", delay: "1.5s", duration: "6s" },
  { top: "62%", left: "20%", delay: "2s", duration: "5.5s" },
  { top: "78%", left: "60%", delay: "2.5s", duration: "4s" },
  { top: "85%", left: "35%", delay: "3s", duration: "6s" },
  { top: "15%", left: "90%", delay: "3.5s", duration: "5s" },
];

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f3d2e_0%,#020617_60%)] opacity-80" />

      <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-green-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="absolute bottom-[-15%] right-[-15%] w-[600px] h-[600px] bg-emerald-400/20 blur-3xl rounded-full animate-pulse" />

      <div
        className="absolute inset-0 opacity-15 grid-animate"
        style={{
          backgroundImage:
            "linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(to right, #39ff14 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
      {/* GLOW LINE 1 */}
<div className="absolute top-[20%] left-[-10%] w-[600px] h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent rotate-12 opacity-30 blur-sm"></div>

{/* GLOW LINE 2 */}
<div className="absolute bottom-[25%] right-[-10%] w-[500px] h-[2px] bg-gradient-to-r from-transparent via-green-300 to-transparent -rotate-12 opacity-30 blur-sm"></div>

{/* RADIAL LIGHT */}
<div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 blur-3xl"></div>

      {particles.map((p, index) => (
        <span
          key={index}
          className="absolute w-2 h-2 rounded-full bg-green-400 shadow-[0_0_25px_#22c55e] particle-animate"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}