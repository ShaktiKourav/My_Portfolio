import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaCode,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },
    { name: "Python", icon: <FaPython />, color: "#FFD43B" },
    { name: "C#", icon: <FaCode />, color: "#9B4F96" },
    { name: "GitHub", icon: <FaGithub />, color: "#ffffff" },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-28 flex items-center bg-transparent overflow-hidden"
    >
      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* SOFT SECTION GLOW */}
      <div className="absolute right-[5%] top-[25%] w-[520px] h-[520px] rounded-full bg-green-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[12%] w-[420px] h-[420px] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-green-400 mb-6 flex items-center gap-5 tracking-[5px]"
        >
          <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
          MY SKILLS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-16 leading-tight"
        >
          Technologies{" "}
          <span className="text-green-400 drop-shadow-[0_0_30px_#22ff88]">
            I Use
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 70, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group relative h-56 flex items-center justify-center"
            >
              {/* OUTER GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"
                style={{ backgroundColor: `${skill.color}22` }}
              />

              {/* HEX ARROW GLASS CARD */}
              <div
                className="relative w-full h-full border border-green-400/25 bg-white/[0.045] backdrop-blur-2xl overflow-hidden transition duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03] group-hover:border-green-400/70 group-hover:shadow-[0_0_45px_#22ff8844]"
                style={{
                  clipPath:
                    "polygon(14% 0%, 86% 0%, 100% 50%, 86% 100%, 14% 100%, 0% 50%)",
                }}
              >
                {/* INNER CUT EFFECT */}
                <div
                  className="absolute inset-[2px] bg-black/35 border border-white/5"
                  style={{
                    clipPath:
                      "polygon(16% 0%, 84% 0%, 98% 50%, 84% 100%, 16% 100%, 2% 50%)",
                  }}
                />

                {/* TOP GLASS SHINE */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-green-400/5" />

                {/* DIAGONAL LIGHT */}
                <div className="absolute -top-16 -left-16 w-32 h-[150%] rotate-12 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[260px] transition-all duration-700" />

                {/* CENTER CONTENT */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
                  <div
                    className="text-6xl mb-5 transition duration-500 group-hover:scale-125"
                    style={{
                      color: skill.color,
                      filter: `drop-shadow(0 0 18px ${skill.color})`,
                    }}
                  >
                    {skill.icon}
                  </div>

                  <h3 className="text-xl font-black text-gray-100 group-hover:text-white transition">
                    {skill.name}
                  </h3>

                  <div className="mt-4 w-16 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_12px_#22ff88]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[1]" />
    </section>
  );
}