import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";

export default function Experience() {
  const timeline = [
    {
      year: "2025",
      title: "Full Stack Developer",
      place: "Personal & Freelance Projects",
      desc: "Building modern web apps with React, Node.js, MongoDB and futuristic UI designs.",
      icon: <FaRocket />,
    },
    {
      year: "2024",
      title: "Frontend Development",
      place: "React Projects",
      desc: "Created responsive interfaces, landing pages, portfolios and component-based UIs.",
      icon: <FaLaptopCode />,
    },
    {
      year: "2023",
      title: "Programming Journey",
      place: "Learning Phase",
      desc: "Started learning programming, DSA, web development and problem-solving.",
      icon: <FaCode />,
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-28 flex items-center bg-transparent overflow-hidden"
    >
      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* SECTION GLOWS */}
      <div className="absolute right-[5%] top-[18%] w-[520px] h-[520px] rounded-full bg-green-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[12%] w-[420px] h-[420px] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-green-400 mb-6 flex items-center gap-5 tracking-[5px]"
        >
          <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
          EXPERIENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-16 leading-tight"
        >
          My{" "}
          <span className="text-green-400 drop-shadow-[0_0_30px_#22ff88]">
            Timeline
          </span>
        </motion.h2>

        <div className="relative">
          {/* CENTER LINE */}
          <div className="absolute left-5 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-green-400 to-transparent shadow-[0_0_25px_#22ff88] md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 80 : -80,
                  y: 40,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                viewport={{ once: true }}
                className={`relative md:w-1/2 pl-14 ${
                  index % 2 === 0
                    ? "md:ml-auto md:pl-16"
                    : "md:pr-16 md:pl-0"
                }`}
              >
                {/* NODE */}
                <div
                  className={`absolute top-8 left-[10px] md:left-auto ${
                    index % 2 === 0 ? "md:-left-[14px]" : "md:-right-[14px]"
                  }`}
                >
                  <div className="relative w-7 h-7 rounded-full bg-green-400 shadow-[0_0_30px_#22ff88]">
                    <div className="absolute inset-[-10px] rounded-full border border-green-400/30 animate-ping" />
                  </div>
                </div>

                {/* CARD */}
                <div className="group relative overflow-hidden rounded-[34px] border border-green-400/25 bg-white/[0.045] backdrop-blur-2xl p-8 hover:border-green-400/80 hover:shadow-[0_0_50px_#22ff8844] hover:-translate-y-3 transition duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,255,136,0.14),transparent_60%)]" />

                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />

                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl border border-green-400/30 bg-green-400/10 flex items-center justify-center text-green-400 text-2xl shadow-[0_0_25px_#22ff8830] group-hover:scale-110 transition">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-green-400 font-bold mb-3 tracking-[3px]">
                        {item.year}
                      </p>

                      <h3 className="text-3xl font-black mb-3 group-hover:text-green-400 transition">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 mb-5">
                        {item.place}
                      </p>

                      <p className="text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[1]" />
    </section>
  );
}