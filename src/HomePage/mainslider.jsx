import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function Mainslider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await cachedRequest("restaurant_images", () =>
          safeRequest(() =>
            pb.collection("restaurant_images").getList(1, 20, {
              sort: "-created",
            })
          )
        );
        setImages(res.items);

      } catch (error) {
        console.error(error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh] relative overflow-hidden">

      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <p className="text-white animate-pulse">Loading...</p>
        </div>
      )}

      {images.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500 }}
          className="h-full"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-full relative">

                <img
                  src={pb.files.getUrl(item, item.images)} // ✅ FIX
                  alt="restaurant"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30"></div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </div>
  );
}

export default Mainslider;