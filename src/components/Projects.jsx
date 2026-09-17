import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "AI Chat Platform",
      category: "Full Stack Application",
      desc: "Modern AI powered chat platform with futuristic UI and real-time interactions.",
      tech: ["React", "Node.js", "AI"],
      number: "01",
    },
    {
      title: "3D Portfolio Website",
      category: "Frontend Development",
      desc: "Interactive futuristic portfolio with animated background and premium UI.",
      tech: ["React", "Three.js", "Tailwind"],
      number: "02",
    },
    {
      title: "E-Commerce Platform",
      category: "MERN Stack",
      desc: "Scalable shopping application with responsive design and smooth experience.",
      tech: ["MongoDB", "Express", "React"],
      number: "03",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-28 flex items-center bg-transparent overflow-hidden"
    >
      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* SECTION GLOWS */}
      <div className="absolute left-[5%] top-[25%] w-[520px] h-[520px] rounded-full bg-green-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-[5%] bottom-[12%] w-[450px] h-[450px] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-green-400 mb-6 flex items-center gap-5 tracking-[5px]"
        >
          <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
          PROJECTS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-16 leading-tight"
        >
          Featured{" "}
          <span className="text-green-400 drop-shadow-[0_0_30px_#22ff88]">
            Work
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group relative rounded-[34px] overflow-hidden border border-green-400/25 bg-white/[0.045] backdrop-blur-2xl hover:border-green-400/80 hover:-translate-y-4 hover:shadow-[0_0_50px_#22ff8844] transition duration-500"
            >
              {/* CARD GLOW */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,255,136,0.14),transparent_60%)]" />

              {/* NUMBER */}
              <span className="absolute top-5 right-6 text-6xl font-black text-white/5 group-hover:text-green-400/10 transition">
                {project.number}
              </span>

              {/* TOP VISUAL */}
              <div className="relative h-64 overflow-hidden border-b border-green-400/10 flex items-center justify-center bg-black/25">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,255,136,0.25),transparent_58%)]" />

                <div className="absolute w-[260px] h-[260px] rounded-full border border-green-400/30 animate-spin" />

                <div className="absolute w-[190px] h-[190px] rounded-full border border-dashed border-green-300/40 animate-[spin_9s_linear_infinite_reverse]" />

                <div className="absolute w-[120px] h-[120px] rounded-[32px] border border-green-400/50 rotate-45 animate-pulse shadow-[0_0_30px_#22ff8830]" />

                <div className="relative w-24 h-24 rounded-[28px] bg-green-400/15 border border-green-400/30 shadow-[0_0_45px_#22ff88] rotate-45 group-hover:scale-110 transition duration-500" />

                {/* scan line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent project-scan" />
              </div>

              {/* CONTENT */}
              <div className="relative p-8">
                <p className="text-green-400 text-sm tracking-[3px] mb-4">
                  {project.category}
                </p>

                <h3 className="text-3xl font-black mb-5 group-hover:text-green-400 transition">
                  {project.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full border border-green-400/25 bg-black/25 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-400 text-black font-bold hover:scale-105 hover:-translate-y-1 active:scale-95 hover:shadow-[0_0_30px_#22ff88] transition duration-300">
                    View <FaArrowRight />
                  </button>

                  <button className="w-12 h-12 rounded-full border border-green-400/40 text-green-400 flex items-center justify-center hover:bg-green-400 hover:text-black hover:shadow-[0_0_25px_#22ff88] transition">
                    <FaGithub />
                  </button>

                  <button className="w-12 h-12 rounded-full border border-green-400/40 text-green-400 flex items-center justify-center hover:bg-green-400 hover:text-black hover:shadow-[0_0_25px_#22ff88] transition">
                    <FaExternalLinkAlt />
                  </button>
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