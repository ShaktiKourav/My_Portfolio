import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import {
  MdEmail,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

export default function Footer() {
  const links = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Contact",
  ];

  const socials = [
    {
      icon: <FaGithub />,
      href: "#",
      color: "#ffffff",
    },

    {
      icon: <FaLinkedin />,
      href: "#",
      color: "#0A66C2",
    },

    {
      icon: <FaXTwitter />,
      href: "#",
      color: "#ffffff",
    },

    {
      icon: <MdEmail />,
      href: "#contact",
      color: "#EA4335",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-green-400/10 bg-black/20 backdrop-blur-3xl text-white">

      {/* TOP FADE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[1]" />

      {/* TOP LIGHT LINE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent blur-sm" />

      {/* SECTION GLOWS */}
      <div className="absolute left-[10%] top-[10%] w-[420px] h-[420px] rounded-full bg-green-400/10 blur-[140px]" />

      <div className="absolute right-[5%] bottom-[5%] w-[380px] h-[380px] rounded-full bg-emerald-400/10 blur-[120px]" />

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,255,136,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(34,255,136,0.5) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20">

        {/* TOP CONTENT */}
        <div className="grid md:grid-cols-3 gap-14 items-start">

          {/* LEFT */}
          <div>
            {/* S LOGO */}
<a href="#home" className="relative w-20 h-14 flex items-center">
  <span className="absolute left-1 text-[64px] leading-none font-black italic text-green-400 drop-shadow-[0_0_18px_#22ff88] logo-s">
    S
  </span>

  <span className="absolute left-0 w-20 h-10 bg-green-400/20 blur-2xl" />
</a>
 
            <p className="text-gray-400 leading-relaxed max-w-sm text-[15px]">
              Building futuristic, scalable and immersive digital experiences
              with premium UI, cinematic visuals and modern technologies.
            </p>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center">

            <h3 className="text-green-400 tracking-[5px] text-sm mb-8">
              NAVIGATION
            </h3>

            <ul className="flex flex-col gap-5 text-center">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group relative text-gray-300 hover:text-green-400 transition duration-300"
                  >
                    {item}

                    <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-green-400 group-hover:w-full group-hover:left-0 transition-all duration-300 shadow-[0_0_10px_#22ff88]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end">

            <h3 className="text-green-400 tracking-[5px] text-sm mb-8">
              CONNECT
            </h3>

            <div className="flex gap-4 flex-wrap justify-end">

              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group relative w-14 h-14 rounded-2xl border border-green-400/20 bg-white/[0.04] backdrop-blur-2xl flex items-center justify-center overflow-hidden hover:-translate-y-2 hover:border-green-400/70 transition duration-300"
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition"
                    style={{
                      backgroundColor: social.color,
                    }}
                  />

                  <span
                    className="relative text-2xl transition duration-300 group-hover:scale-110"
                    style={{
                      color: social.color,
                      filter: `drop-shadow(0 0 12px ${social.color})`,
                    }}
                  >
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* EMAIL */}
            <p className="mt-8 text-gray-500 text-sm">
              sk7555911@gmail.com
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="relative mt-16 pt-8 border-t border-green-400/10">

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">

            <p className="text-gray-500 text-sm">
              © 2026 Satyam Kushwaha. All rights reserved.
            </p>

            {/* TECH STACK */}
            <div className="flex items-center gap-4 text-[11px] tracking-[4px] text-green-400">
              <span>REACT</span>
              <span className="w-1 h-1 rounded-full bg-green-400" />
              <span>TAILWIND</span>
              <span className="w-1 h-1 rounded-full bg-green-400" />
              <span>THREEJS</span>
            </div>

            {/* BACK TO TOP */}
            <a
              href="#home"
              className="group w-12 h-12 rounded-2xl border border-green-400/25 bg-white/[0.05] backdrop-blur-xl flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-black hover:shadow-[0_0_25px_#22ff88] hover:-translate-y-1 transition duration-300"
            >
              <MdKeyboardDoubleArrowUp className="text-2xl group-hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}