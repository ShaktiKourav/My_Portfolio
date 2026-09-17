// import Hero3D from "./Hero3D";
// import About3D from "./About3D";

// export default function App3D() {
//   return (
//     <div className="absolute top-0 left-0 w-full h-[220vh] z-[1] pointer-events-none overflow-visible">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,197,94,0.20)_0%,#020617_38%,#000_88%)]" />

//       <div className="absolute top-0 left-0 w-full h-[120vh] overflow-visible">
//         <Hero3D />
//       </div>

//       <div className="absolute top-[80vh] left-0 w-full h-[120vh] overflow-visible">
//         <About3D />
//       </div>
//     </div>
//   );
// }
import Hero3D from "./Hero3D";
import About3D from "./About3D";
import Skills3D from "./Skills3D";
import Projects3D from "./Projects3D";
import Experience3D from "./Experience3D";
import Contact3D from "./Contact3D";

export default function App3D() {
  return (
    <div className="absolute top-0 left-0 w-full h-[680vh] z-[1] pointer-events-none overflow-visible">
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,197,94,0.20)_0%,#020617_38%,#000_88%)]" />

      {/* HERO */}
      <div className="absolute top-0 left-0 w-full h-[120vh] overflow-visible">
        <Hero3D />
      </div>

      {/* ABOUT */}
      <div className="absolute top-[80vh] left-0 w-full h-[120vh] overflow-visible">
        <About3D />
      </div>

      {/* SKILLS */}
      <div className="absolute top-[180vh] left-0 w-full h-[120vh] overflow-visible">
        <Skills3D />
      </div>

      {/* PROJECTS */}
      <div className="absolute top-[280vh] left-0 w-full h-[120vh] overflow-visible">
        <Projects3D />
      </div>

      {/* EXPERIENCE */}
      <div className="absolute top-[380vh] left-0 w-full h-[120vh] overflow-visible">
        <Experience3D />
      </div>

      {/* CONTACT */}
      <div className="absolute top-[480vh] left-0 w-full h-[120vh] overflow-visible">
        <Contact3D />
      </div>
    </div>
  );
}