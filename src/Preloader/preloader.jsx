function Preloader() {
  return (
    <div className="
      fixed inset-0 z-[999]
      flex items-center justify-center
      bg-black/40 backdrop-blur-sm
      animate-fadeIn
    ">

      <div className="
        bg-black/80
        px-6 py-5 rounded-xl
        flex flex-col items-center gap-3
        shadow-2xl
      ">

        {/* 🔄 Spinner */}
        <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>

        {/* 📝 Text */}
        <p className="text-white text-sm sm:text-base font-medium animate-pulse">
          Loading your delicious menu 🍽
        </p>

      </div>

      {/* 🔥 Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

    </div>
  );
}

export default Preloader;