import About3D from "./About3D";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaRocket, FaBrain } from "react-icons/fa";

function CountUp({ end, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    {
      icon: <FaCode />,
      number: 10,
      suffix: "+",
      label: "Projects",
      desc: "Built with modern UI",
    },
    {
      icon: <FaRocket />,
      number: 5,
      suffix: "+",
      label: "Tech Skills",
      desc: "React, Node, MongoDB",
    },
    {
      icon: <FaBrain />,
      number: 100,
      suffix: "%",
      label: "Learning",
      desc: "Growth mindset",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-28 overflow-hidden bg-transparent"
    >
      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* ABOUT 3D BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <About3D />
      </div>

      {/* EXTRA GLOW */}
      <div className="absolute left-[5%] top-[35%] w-[520px] h-[520px] rounded-full bg-green-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[15%] w-[420px] h-[420px] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE LABELS / SPACE FOR 3D */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[620px] hidden lg:block"
        >
          <span className="absolute top-[14%] left-[8%] px-6 py-3 border border-green-400/50 text-green-300 rounded-2xl bg-black/25 backdrop-blur-xl font-bold tracking-[4px] shadow-[0_0_30px_#22ff8830]">
            CREATIVE
          </span>

          <span className="absolute bottom-[18%] right-[6%] px-6 py-3 border border-green-400/50 text-green-300 rounded-2xl bg-black/25 backdrop-blur-xl font-bold tracking-[4px] shadow-[0_0_30px_#22ff8830]">
            DEVELOPER
          </span>

          <div className="absolute left-[8%] bottom-[10%] w-56 rounded-3xl border border-green-400/30 bg-black/25 backdrop-blur-2xl p-5 shadow-[0_0_35px_#22ff8830]">
            <p className="text-green-400 text-xs tracking-[4px] mb-3">
              PASSION
            </p>

            <h3 className="text-white text-2xl font-bold">
              Innovation
            </h3>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-green-400 text-sm md:text-lg mb-6 flex items-center gap-5 tracking-[5px]">
            <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
            ABOUT ME
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-[0.95] mb-7">
            Building Digital <br />

            <span className="text-green-400 drop-shadow-[0_0_30px_#22ff88]">
              Experiences.
            </span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
            I am Satyam Kushwaha, an aspiring software engineer and full-stack
            developer focused on creating futuristic, scalable and visually
            impressive web experiences.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl">
            I work with React, JavaScript, Tailwind CSS, Node.js and modern web
            technologies to build clean, responsive and interactive applications.
          </p>

          {/* ADVANCED STATS */}
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-green-400/25 bg-black/25 backdrop-blur-2xl p-6 shadow-[0_0_30px_#22ff8820] hover:border-green-400/70 hover:-translate-y-2 hover:shadow-[0_0_45px_#22ff8844] transition duration-300"
              >
                {/* glow background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,255,136,0.16),transparent_60%)] opacity-70" />

                {/* moving line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl border border-green-400/30 bg-green-400/10 flex items-center justify-center text-green-400 text-2xl mb-5 shadow-[0_0_25px_#22ff8830] group-hover:scale-110 transition">
                    {item.icon}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-green-400 drop-shadow-[0_0_20px_#22ff88] mb-2">
                    <CountUp end={item.number} suffix={item.suffix} />
                  </h3>

                  <p className="text-white font-bold mb-2">
                    {item.label}
                  </p>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[1]" />
    </section>
  );
}