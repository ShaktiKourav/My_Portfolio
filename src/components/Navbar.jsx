import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="relative max-w-7xl mx-auto rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.12] before:via-transparent before:to-green-400/[0.03] before:pointer-events-none">
        {/* glass shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-green-400/5 pointer-events-none" />
        <div className="absolute -top-10 left-[-20%] w-[60%] h-[180%] rotate-12 bg-white/[0.05] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400/90 to-transparent shadow-[0_0_22px_#22ff88]" />

        <div className="relative px-6 md:px-10 py-3 flex items-center justify-between">
          {/* S LOGO */}
          <a href="#home" className="relative w-20 h-14 flex items-center">
            <span className="absolute left-1 text-[64px] leading-none font-black italic text-green-400 drop-shadow-[0_0_18px_#22ff88] logo-s">
              S
            </span>
            <span className="absolute left-0 w-20 h-10 bg-green-400/20 blur-2xl" />
          </a>

          {/* LINKS */}
          <ul className="hidden md:flex items-center gap-10 text-gray-200 font-medium">
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-green-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* HIRE */}
          <a
            href="#contact"
            className="hidden md:flex px-7 py-2.5 rounded-full border border-green-400/50 text-green-400 bg-white/[0.03] backdrop-blur-xl hover:bg-green-400 hover:text-black hover:shadow-[0_0_30px_#22ff88] transition"
          >
            Hire Me
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-green-400 text-3xl"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <div className="relative md:hidden border-t border-green-400/20 bg-black/60 backdrop-blur-xl px-6 py-5">
            <ul className="flex flex-col gap-5 text-gray-300">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block hover:text-green-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}