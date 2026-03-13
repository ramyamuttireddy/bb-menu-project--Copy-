function SubCategoryBar({ activeCategory, activeSub, setActiveSub }) {
  return (
    <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-body border-b">

      <div className="flex overflow-x-auto gap-8 hide-scroll justify-center ">

        {activeCategory.subs?.map((sub) => {

          const isActive = activeSub === sub.id;

          return (
            <button
              key={sub.id}
              onClick={() => setActiveSub(sub.id)}
              className="flex flex-col items-center gap-5 relative pb-2 text-sm sm:text-base whitespace-nowrap"
            >

              <span
                className={`transition ${
                  isActive ? "text-[#CD7D1C] font-semibold" : "text-[#7a4b18]"
                }`}
              >
                {sub.name}
              </span>

              {isActive && (
                <span className="absolute bottom-0 h-[3px] w-full bg-[#CD7D1C] rounded-full"/>
              )}

            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SubCategoryBar;