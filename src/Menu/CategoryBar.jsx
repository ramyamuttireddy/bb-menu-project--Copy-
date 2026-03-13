import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryBar({
  MENU,
  activeCategory,
  setActiveCategory,
  setActiveSub,
}) {

  const navigate = useNavigate();

  return (

    <div className="sticky top-0 z-30 backdrop-blur-md bg-[#fff5ea]  shadow-md border-b border-[#728D3E]">

      <div className="
        flex items-center
        gap-2 sm:gap-3 md:gap-4
        overflow-x-auto hide-scroll
        px-2 sm:px-4 md:px-6
        py-2
      ">

        {/* HOME BUTTON */}

        <button
          onClick={() => navigate("/")}
          className="
          flex-shrink-0
          flex items-center justify-center
          w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11
          rounded-full
          bg-[#728D3E] text-white
          shadow hover:scale-105
          transition
          "
        >
          <Home size={18} className="sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px]" />
        </button>


        {MENU.map((cat) => {

          const isOff = cat.unavailable === true;
          const isActive = activeCategory?.id === cat.id;

          return (

            <button
              key={cat.id}

              onClick={() => {

                setActiveCategory(cat);

                const firstSub =
                  cat.subs?.find((s) => s.unavailable !== true) ||
                  cat.subs?.[0];

                setActiveSub(firstSub?.id || null);
              }}

              className={`
              relative overflow-hidden flex-shrink-0
              
              px-3 sm:px-4 md:px-5
              py-1.5 sm:py-2
              
              rounded-full
              whitespace-nowrap
              
              text-xs sm:text-sm md:text-[15px]
              font-medium
              
              transition
              border border-[#e6c7a4]

              ${
                isActive
                  ? "bg-[#728D3E] text-white"
                  : "bg-white text-[#7a4b18]"
              }

              group
              `}

            >

              {/* Hover animation */}

              {!isActive && (
                <span
                  className="
                  absolute inset-0
                  bg-[#728D3E]
                  -translate-x-full
                  group-hover:translate-x-0
                  transition-transform duration-300 ease-out
                  "
                />
              )}

              {/* TEXT */}

              <span className="relative flex items-center gap-1 sm:gap-2 group-hover:text-white">

                {cat.name}

                {isOff && (
                  <span className="
                  text-[10px] sm:text-xs
                  bg-[#CD7D1C]
                  text-white
                  px-1.5 sm:px-2
                  py-[1px]
                  rounded-full
                  ">
                    OFF
                  </span>
                )}

              </span>

            </button>
          );
        })}

      </div>
    </div>
  );
}

export default CategoryBar;