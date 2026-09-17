import Hero3D from "./Hero3D";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 pt-28 overflow-hidden bg-transparent"
    >
      {/* HERO 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hero3D />
      </div>

      {/* TOP GLOW */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* SMALL LABEL */}
          <p className="text-green-400 text-sm md:text-lg mb-6 flex items-center gap-5 tracking-[5px]">
            <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
            <TypeAnimation
  sequence={[
    "FULL STACK DEVELOPER",
    1600,
    "REACT DEVELOPER",
    1600,
    "FRONTEND DESIGNER",
    1600,
    "PROBLEM SOLVER",
    1600,
  ]}
  wrapper="span"
  speed={50}
  repeat={Infinity}
/>
          </p>

          {/* MAIN HEADING */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.92] mb-7">
            <span className="text-white">
              Satyam
            </span>

            <br />

            <span className="text-green-400 drop-shadow-[0_0_30px_#22ff88]">
              Kushwaha.
            </span>
          </h1>

          {/* SUB HEADING */}
          <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-semibold leading-relaxed">
            I Build Futuristic
            <span className="text-green-400"> Web Experiences</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            Modern portfolio with immersive 3D motion, cinematic visuals,
            premium UI and scalable full-stack development experiences.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-10">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-green-400 text-black font-bold hover:scale-105 hover:-translate-y-1 active:scale-95 hover:shadow-[0_0_40px_#22ff88] transition duration-300"
            >
              View Projects →
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-green-400/50 bg-black/20 backdrop-blur-xl text-green-400 hover:bg-green-400 hover:text-black hover:-translate-y-1 active:scale-95 hover:shadow-[0_0_35px_#22ff88] transition duration-300"
            >
              Contact Me
            </a>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-5 mt-10">
            {[FaGithub, FaLinkedin, FaXTwitter, MdEmail].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-14 h-14 rounded-2xl border border-green-400/30 bg-black/25 backdrop-blur-xl flex items-center justify-center text-green-400 text-2xl hover:bg-green-400 hover:text-black hover:-translate-y-2 hover:shadow-[0_0_30px_#22ff88] transition duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="relative h-[620px] hidden lg:flex items-center justify-center"
        >
          {/* DESIGN */}
          <span className="absolute top-[10%] left-[8%] px-6 py-3 border border-green-400/50 text-green-300 rounded-2xl bg-black/20 backdrop-blur-xl font-bold tracking-[4px] shadow-[0_0_30px_#22ff8830]">
            DESIGN
          </span>

          {/* CODE */}
          <span className="absolute top-[18%] right-[5%] px-6 py-3 border border-green-400/50 text-green-300 rounded-2xl bg-black/20 backdrop-blur-xl font-bold tracking-[4px] shadow-[0_0_30px_#22ff8830]">
            CODE
          </span>

          {/* BUILD */}
          <span className="absolute bottom-[24%] right-[6%] px-6 py-3 border border-green-400/50 text-green-300 rounded-2xl bg-black/20 backdrop-blur-xl font-bold tracking-[4px] shadow-[0_0_30px_#22ff8830]">
            BUILD
          </span>

          {/* FRONTEND */}
          <div className="absolute left-[2%] bottom-[22%] w-48 rounded-3xl border border-green-400/30 bg-black/20 backdrop-blur-2xl p-5 shadow-[0_0_35px_#22ff8830] hover:-translate-y-2 transition duration-300">
            <p className="text-green-400 text-xs tracking-[4px] mb-3">
              FRONTEND
            </p>

            <h3 className="text-white text-2xl font-bold">
              React.js
            </h3>
          </div>

          {/* BACKEND */}
          <div className="absolute right-[2%] bottom-[6%] w-52 rounded-3xl border border-green-400/30 bg-black/20 backdrop-blur-2xl p-5 shadow-[0_0_35px_#22ff8830] hover:-translate-y-2 transition duration-300">
            <p className="text-green-400 text-xs tracking-[4px] mb-3">
              BACKEND
            </p>

            <h3 className="text-white text-2xl font-bold">
              Node.js
            </h3>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[1]" />
    </section>
  );
}