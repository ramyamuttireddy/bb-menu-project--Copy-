import { useEffect, useState } from "react";
import pb from "../API/api";
import { cachedRequest } from "../API/cache";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function NoticeSlider() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await cachedRequest("notices", () =>
          pb.collection("notices").getFullList({ sort: "-created" })
        );
        setNotices(res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotices();
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="w-full flex justify-center items-center bg-transparent">
      <div className="w-[95%] md:w-[85%] lg:w-[70%] bg-[#F5F5DC] border border-yellow-300 rounded-full shadow-md p-2 flex items-center justify-center">

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          className="w-full h-full"
        >
          {notices.map((item) => (
            <SwiperSlide key={item.id} className="flex items-center justify-center ">

              <p className="text-center text-sm md:text-center font-medium text-gray-700 leading-relaxed w-full">
                {typeof item.content === "string"
                  ? item.content
                  : item.content?.text ||
                    JSON.stringify(item.content) ||
                    "No content"}
              </p>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}

export default NoticeSlider;