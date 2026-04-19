import FooditemSlider from "./fooditemSlider";
import ExploreDishes from "./exploreDishes";
import Mainslider from "./mainslider";
import NoticeSlider from "./noticeSlider";

import bgImage from "../../public/assets/image/beige-bg.jpg";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center w-full flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-black/20" />

      <div className="relative z-10 px-3 sm:px-4 md:px-6 py-4 w-full">

        {/* 🔥 TOP IMAGE SLIDER */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Mainslider />
        </div>

        {/* 🔥 NOTICE SLIDER */}
        <div className="mt-6 rounded-2xl overflow-hidden">
          <NoticeSlider />
        </div>

        {/* 🔥 MAIN CARD */}
        <div
          className="
            mt-8
            flex flex-col md:flex-row
            w-full
            min-h-[60vh] md:h-[50vh] lg:h-[50vh] xl:h-[75vh]
            rounded-2xl overflow-hidden
            bg-white/10 backdrop-blur-lg
            border border-white/20
            items-stretch   /* 🔥 IMPORTANT */
          "
        >

          {/* LEFT */}
          <div className="w-full md:w-1/2 h-full">
            <FooditemSlider />
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block w-[1px] bg-black/30"></div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 h-full">
            <ExploreDishes />
          </div>

        </div>

      </div>
    </div>
  );
}