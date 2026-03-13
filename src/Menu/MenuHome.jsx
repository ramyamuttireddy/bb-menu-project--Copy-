import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useCategory from "./useCategory";
import { slugify } from "../Utilis/slugify";
import pb from "../API/api";

function MenuHome() {
  const categories = useCategory();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f1e7] to-[#efe2d1] p-6 font-body">

      {/* Page Title */}
      {/* <h1 className="text-3xl md:text-4xl font-bold text-center text-[#7a4b18] mb-10 tracking-wide">
        Explore Our Menu
      </h1> */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {categories.map((cat, index) => {

          const imageUrl = cat.image
            ? pb.files.getUrl(cat, cat.image)
            : "/placeholder-food.jpg";

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate(`/menu/${slugify(cat.name)}`)
              }
              className="relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl group"
            >
              {/* Image Height Increased */}
              <img
                src={imageUrl}
                className="w-full h-[300px] md:h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Soft Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition duration-300"></div>

              {/* ✅ Green Stripe Behind Name */}
              <div className="absolute bottom-0 w-full">
                <div className="bg-[#728D3E] py-3 text-center">
                  <h2 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    {cat.name}
                  </h2>
                </div>
              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}

export default MenuHome;