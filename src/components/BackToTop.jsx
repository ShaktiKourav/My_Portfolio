export default function BackToTop() {
  return (
    <a
      href="#home"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full border border-green-400/40 bg-black/50 backdrop-blur-md text-green-400 flex items-center justify-center text-2xl hover:bg-green-400 hover:text-black hover:shadow-[0_0_30px_#22c55e] transition"
    >
      ↑
    </a>
  );
}