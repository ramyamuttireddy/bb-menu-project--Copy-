import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 sm:w-16 sm:h-16
        bg-[#d68910]
        rounded-full
        flex items-center justify-center
        shadow-xl
        cursor-pointer
        transition duration-300
        hover:scale-110 hover:bg-[#b9770e]
      "
    >
      {/* 🔥 EXACT CURVED BACK ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 sm:w-7 sm:h-7 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 7L4 12L9 17V13H14C16.21 13 18 11.21 18 9C18 8.45 17.55 8 17 8C16.45 8 16 8.45 16 9C16 10.1 15.1 11 14 11H9V7Z" />
      </svg>
    </div>
  );
}

export default BackButton;