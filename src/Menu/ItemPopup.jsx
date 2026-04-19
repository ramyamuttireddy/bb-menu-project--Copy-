import pb from "../API/api";
import Header from "./Header";

function ItemPopup({ items, selectedIndex, setSelectedIndex }) {
  const selectedItem =
    selectedIndex !== null ? items[selectedIndex] : null;

  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col">

      {/* HEADER */}
      <Header />

      {/* CONTENT AREA (NO GAP) */}
      <div
        className="flex-1 flex items-center justify-center"
        onClick={() => setSelectedIndex(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-[95vw] sm:w-[85vw] md:w-[100vw]
            h-[88vh]
            bg-white
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-2xl
            flex flex-col
            animate-fadeIn
          "
        >

          {/* IMAGE */}
          <div className="relative h-[75%] sm:h-[80%]">
            <img
              src={
                selectedItem.image
                  ? pb.files.getUrl(selectedItem, selectedItem.image)
                  : "/placeholder-food.jpg"
              }
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* PREV */}
            <button
              disabled={selectedIndex === 0}
              onClick={() => setSelectedIndex((prev) => prev - 1)}
              className={`
                absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                rounded-full bg-black/40 backdrop-blur-md
                flex items-center justify-center
                text-xl sm:text-2xl md:text-3xl text-white
                transition hover:scale-110
                ${selectedIndex === 0 && "opacity-30 cursor-not-allowed"}
              `}
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              disabled={selectedIndex === items.length - 1}
              onClick={() => setSelectedIndex((prev) => prev + 1)}
              className={`
                absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                rounded-full bg-black/40 backdrop-blur-md
                flex items-center justify-center
                text-xl sm:text-2xl md:text-3xl text-white
                transition hover:scale-110
                ${
                  selectedIndex === items.length - 1 &&
                  "opacity-30 cursor-not-allowed"
                }
              `}
            >
              ›
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 p-4 sm:p-5">

            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base sm:text-xl md:text-2xl font-semibold sm:font-bold text-[#7a4b18]">
                {selectedItem.name}
              </h2>

              <div className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <span className="text-green-700 font-bold text-sm sm:text-lg">
                  ${selectedItem.price}
                </span>
              </div>
            </div>

            {selectedItem.description && (
              <p className="text-gray-600 mt-3 text-sm sm:text-base">
                {selectedItem.description}
              </p>
            )}

          </div>

          {/* BACK BUTTON */}
          <div
            onClick={() => setSelectedIndex(null)}
            className="
              absolute bottom-5 right-5
              w-12 h-12 sm:w-14 sm:h-14
              bg-[#d68910]
              rounded-full
              flex items-center justify-center
              shadow-xl cursor-pointer
              hover:scale-110 transition
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 7L4 12L9 17V13H14C16.21 13 18 11.21 18 9C18 8.45 17.55 8 17 8C16.45 8 16 8.45 16 9C16 10.1 15.1 11 14 11H9V7Z" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ItemPopup;