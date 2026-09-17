export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
      <div className="relative flex items-center justify-center">

        <div className="absolute w-40 h-40 rounded-full border border-green-400/30 animate-spin"></div>

        <div className="absolute w-28 h-28 rounded-full border border-green-300/40 animate-[spin_6s_linear_infinite_reverse]"></div>

        <div className="w-16 h-16 rounded-full bg-green-400 shadow-[0_0_40px_#22c55e] animate-pulse"></div>

      </div>
    </div>
  );
}