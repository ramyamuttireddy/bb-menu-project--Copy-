import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExploreDishes = () => {
  const [signatureDish, setSignatureDish] = useState(null);
  const [exploreMenu, setExploreMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const [signature, explore] = await Promise.all([
          cachedRequest("signature_dish", () =>
            safeRequest(() =>
              pb.collection("signature_images").getOne("bakxdec5r2k5ikz")
            )
          ),
          cachedRequest("explore_menu", () =>
            safeRequest(() =>
              pb.collection("signature_images").getOne("1egp64vjdjll5p9")
            )
          ),
        ]);

        setSignatureDish(signature);
        setExploreMenu(explore);

      } catch (error) {
        console.error(error);
      }
    }

    fetchMenu();
  }, []);

  if (!signatureDish || !exploreMenu) return null;

  return (
    <div className="flex flex-col w-full h-full">

      {/* SIGNATURE */}
      <div
        onClick={() => navigate("/menu/bharat-bhavan-signature-dishes")}
        className="relative w-full cursor-pointer group overflow-hidden h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-1/2"
      >
        <img
          src={pb.files.getUrl(signatureDish, signatureDish.image)} // ✅ FIX
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md px-4 py-3 text-white text-center">
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl font-bold">
            {signatureDish.name}
          </h2>
        </div>
      </div>

      <div className="w-full h-[2px] bg-black/60"></div>

      {/* EXPLORE */}
      <div
        onClick={() => navigate("/menu-home")}
        className="relative w-full cursor-pointer group overflow-hidden h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-1/2"
      >
        <img
          src={pb.files.getUrl(exploreMenu, exploreMenu.image)} // ✅ FIX
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md px-4 py-3 text-white text-center">
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl font-bold">
            {exploreMenu.name}
          </h2>
        </div>
      </div>

    </div>
  );
};

export default ExploreDishes;