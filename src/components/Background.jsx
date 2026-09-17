const particles = Array.from({ length: 42 }, (_, i) => ({
  top: `${(i * 23) % 100}%`,
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  duration: `${4 + (i % 5)}s`,
}));

const cracks = Array.from({ length: 18 }, (_, i) => ({
  top: `${5 + ((i * 17) % 90)}%`,
  left: `${-20 + ((i * 29) % 120)}%`,
  width: `${220 + ((i * 43) % 480)}px`,
  rotate: i % 2 === 0 ? "35deg" : "-35deg",
  delay: `${i * 0.45}s`,
  direction: i % 2 === 0 ? "crack-down" : "crack-up",
}));

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none will-change-transform">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.18)_0%,#020617_42%,#000_90%)]" />

      {/* ASYMMETRIC FUTURISTIC GRID */}
      <div
        className="absolute inset-0 opacity-[0.09] grid-animate"
        style={{
          backgroundImage: `
            linear-gradient(115deg, rgba(34,255,136,0.75) 1px, transparent 1px),
            linear-gradient(67deg, rgba(34,255,136,0.35) 1px, transparent 1px),
            linear-gradient(180deg, rgba(34,255,136,0.22) 1px, transparent 1px)
          `,
          backgroundSize: "130px 90px, 210px 160px, 95px 180px",
          backgroundPosition: "0 0, 45px 35px, 20px 80px",
        }}
      />

      {/* SOFT GLOW BLOBS */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-green-400/10 blur-[160px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-emerald-400/10 blur-[150px]" />

      {/* THIN SHINING CRACK LINES */}
      {cracks.map((c, index) => (
        <span
          key={index}
         className={`absolute h-[1px] bg-gradient-to-r from-transparent via-green-300 to-transparent ${c.direction}`}
          style={{
            top: c.top,
            left: c.left,
            width: c.width,
            transform: `rotate(${c.rotate})`,
            animationDelay: c.delay,
          }}
        />
      ))}

      {/* PARTICLES */}
      {particles.map((p, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-green-400 shadow-[0_0_22px_#22ff88] particle-animate"
          style={{
            top: p.top,
            left: p.left,
            width: index % 4 === 0 ? "5px" : "2px",
            height: index % 4 === 0 ? "5px" : "2px",
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: index % 3 === 0 ? 0.65 : 0.3,
          }}
        />
      ))}
    </div>
  );
}