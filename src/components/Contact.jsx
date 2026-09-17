import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Contact() {
  const socials = [
    { icon: <FaGithub />, color: "#ffffff", href: "#" },
    { icon: <FaLinkedin />, color: "#0A66C2", href: "#" },
    { icon: <FaInstagram />, color: "#E4405F", href: "#" },
    { icon: <MdEmail />, color: "#EA4335", href: "mailto:sk7555911@gmail.com" },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 py-28 flex items-center bg-transparent overflow-hidden"
    >
      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* SECTION GLOWS */}
      <div className="absolute left-[8%] top-[20%] w-[520px] h-[520px] rounded-full bg-green-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-[8%] bottom-[10%] w-[460px] h-[460px] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-green-400 mb-6 flex items-center gap-5 tracking-[5px]">
            <span className="w-16 h-[2px] bg-green-400 shadow-[0_0_12px_#22ff88]" />
            CONTACT
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-[0.95] mb-8">
            Let’s Build
            <span className="block text-green-400 drop-shadow-[0_0_30px_#22ff88]">
              Something Amazing.
            </span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">
            Have a project idea, collaboration or opportunity? Let’s connect and
            create futuristic experiences together.
          </p>

          {/* CONTACT INFO */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-gray-300">
              <span className="w-12 h-12 rounded-2xl border border-green-400/25 bg-black/30 backdrop-blur-xl flex items-center justify-center text-green-400 text-2xl shadow-[0_0_25px_#22ff8820]">
                <MdEmail />
              </span>
              <span>sk7555911@gmail.com</span>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <span className="w-12 h-12 rounded-2xl border border-green-400/25 bg-black/30 backdrop-blur-xl flex items-center justify-center text-green-400 text-2xl shadow-[0_0_25px_#22ff8820]">
                <MdLocationOn />
              </span>
              <span>India • Available for remote work</span>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-5">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group relative w-16 h-16 rounded-2xl border border-green-400/25 bg-white/[0.045] backdrop-blur-2xl flex items-center justify-center text-2xl hover:-translate-y-2 hover:scale-105 hover:border-green-400/70 transition duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 blur-xl transition"
                  style={{ backgroundColor: social.color }}
                />
                <span
                  className="relative transition group-hover:scale-110"
                  style={{
                    color: social.color,
                    filter: `drop-shadow(0 0 14px ${social.color})`,
                  }}
                >
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="group relative rounded-[36px] border border-green-400/25 bg-white/[0.045] backdrop-blur-2xl p-10 shadow-[0_0_45px_#22ff8822] overflow-hidden"
        >
          {/* FORM GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,255,136,0.16),transparent_62%)]" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />

          {/* SCAN LIGHT */}
          <div className="absolute -top-20 -left-20 w-40 h-[140%] rotate-12 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[520px] transition-all duration-1000" />

          <div className="relative space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-5 rounded-2xl bg-black/35 border border-green-400/25 outline-none focus:border-green-400 focus:shadow-[0_0_22px_#22ff8844] text-white placeholder:text-gray-500 transition duration-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-5 rounded-2xl bg-black/35 border border-green-400/25 outline-none focus:border-green-400 focus:shadow-[0_0_22px_#22ff8844] text-white placeholder:text-gray-500 transition duration-300"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-5 rounded-2xl bg-black/35 border border-green-400/25 outline-none focus:border-green-400 focus:shadow-[0_0_22px_#22ff8844] text-white placeholder:text-gray-500 resize-none transition duration-300"
            ></textarea>

            <button className="w-full py-5 rounded-2xl bg-green-400 text-black font-black flex items-center justify-center gap-3 hover:shadow-[0_0_40px_#22ff88] hover:scale-[1.02] active:scale-95 transition duration-300">
              Send Message <FaPaperPlane />
            </button>
          </div>
        </motion.form>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[1]" />
    </section>
  );
}