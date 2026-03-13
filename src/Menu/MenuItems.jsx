import pb from "../API/api";

function MenuItems({
  items,
  loading,
  setSelectedItem,
  activeCategory,
}) {

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        No items available
      </div>
    );
  }

  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  const manualCategoryOff =
    activeCategory?.unavailable === true;

  const categoryUnavailableDays =
    activeCategory?.unavailableDays || [];

  const dayBasedOff =
    categoryUnavailableDays.includes(today);

  const categoryOff =
    manualCategoryOff || dayBasedOff;

  return (

    <div className="
      grid 
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-3
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-4
      sm:gap-5
      md:gap-6
      p-3
      sm:p-4
      md:p-6
    ">

      {items.map((item) => {

        const itemOff =
          item?.Unavailable === true;

        const isDisabled =
          categoryOff || itemOff;

        let label = null;

        if (categoryOff) {
          label = "Unavailable Today";
        } else if (itemOff) {
          label = "Unavailable";
        }

        return (

          <div
            key={item.id}
            onClick={() => {
              if (isDisabled) return;
              setSelectedItem(item);
            }}
            className={`
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-lg
            transition
            duration-300
            ${
              isDisabled
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }`}
          >

            <div className="relative">

              <img
                src={
                  item.image
                    ? pb.files.getUrl(item, item.image)
                    : "/placeholder-food.jpg"
                }
                className="
                w-full
                h-[180px]
                sm:h-[200px]
                md:h-[220px]
                lg:h-[240px]
                xl:h-[260px]
                object-cover
                "
              />

              {isDisabled && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

                  <span className="bg-[#CD7D1C] px-4 py-1 rounded-full text-white text-xs sm:text-sm">
                    {label}
                  </span>

                </div>
              )}
            </div>

            <div className="p-3 sm:p-4 text-center">

              <h3 className="font-semibold text-[#7a4b18] text-sm sm:text-base">
                {item.name}
              </h3>

              <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
                ₹{item.price}
              </p>

            </div>

          </div>
        );
      })}
    </div>
  );
}

export default MenuItems;