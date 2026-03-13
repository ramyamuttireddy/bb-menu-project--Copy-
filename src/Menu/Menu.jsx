import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import useCategory from "./useCategory";
import useMenu from "./UseMenu";
import { slugify } from "../Utilis/slugify";

import CategoryBar from "./CategoryBar";
import SubCategoryBar from "./SubCategoryBar";
import MenuItems from "./MenuItems";
import pb from "../API/api";

function Menu() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const categories = useCategory();

  const [activeSub, setActiveSub] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const activeCategory = useMemo(() => {
    if (!categories.length) return null;

    return categories.find(
      (c) => slugify(c.name) === categorySlug
    );
  }, [categories, categorySlug]);

  useEffect(() => {
    if (!categories.length) return;

    if (!activeCategory) {
      navigate("/");
    }
  }, [activeCategory, categories, navigate]);

  useEffect(() => {
    if (!activeCategory) return;

    const firstSub =
      activeCategory.subs?.find((s) => s.unavailable !== true) ||
      activeCategory.subs?.[0];

    setActiveSub(firstSub?.id || null);
  }, [activeCategory]);

  const { items, loading } = useMenu(
    activeCategory?.id,
    activeSub
  );

  if (!activeCategory) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-body min-h-screen bg-[#f8f1e7]">

      <CategoryBar
        MENU={categories}
        activeCategory={activeCategory}
        setActiveCategory={(cat) =>
          navigate(`/menu/${slugify(cat.name)}`)
        }
        setActiveSub={setActiveSub}
      />

      <SubCategoryBar
        activeCategory={activeCategory}
        activeSub={activeSub}
        setActiveSub={setActiveSub}
      />

      <MenuItems
        items={items}
        loading={loading}
        setSelectedItem={setSelectedItem}
        activeCategory={activeCategory}
      />

      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full"
          >
            <img
              src={
                selectedItem.image
                  ? pb.files.getUrl(selectedItem, selectedItem.image)
                  : "/placeholder-food.jpg"
              }
              className="w-full h-[400px] object-cover"
            />

            <div className="p-5 text-center">
              <h2 className="text-[#7a4b18] font-bold text-2xl">
                {selectedItem.name}
              </h2>

              <p className="text-green-700 font-semibold mt-2 text-xl">
                ₹{selectedItem.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;