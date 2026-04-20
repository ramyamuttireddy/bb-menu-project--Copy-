import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import pb, { safeRequest } from "../API/api"; // ✅ FIX
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { slugify } from "../Utilis/slugify";

function FooditemSlider() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await safeRequest(() =>
          pb.collection("food_item").getList(1, 20, { // ✅ FIX
            filter: "new_addition=true",
            sort: "-created",
            expand: "categoryId",
          })
        );

        setItems(res.items); // ✅ FIX

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="text-white text-center py-10">No items 😢</div>;
  }

  return (
    <div className="relative w-full h-full">

      <div className="swiper-button-prev !text-white z-20"></div>
      <div className="swiper-button-next !text-white z-20"></div>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        speed={1000}
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-full">
            <div
              onClick={() =>
                navigate(`/menu/${slugify(item.expand?.categoryId?.name)}`)
              }
              className="relative w-full h-full cursor-pointer group"
            >
              <img
                src={pb.files.getUrl(item, item.image)} // ✅ FIX
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 
              bg-black/40 backdrop-blur-md px-6 py-4 text-white text-center w-full">

                <h2 className="text-xl md:text-2xl font-bold">
                  {item.name}
                </h2>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 
              bg-black/40 backdrop-blur-md px-6 py-4 text-white text-center w-full text-xl md:text-2xl font-bold">
                New Additions
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FooditemSlider;