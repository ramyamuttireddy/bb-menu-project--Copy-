import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import useCategory from "./useCategory";
import useMenu from "./UseMenu";
import { slugify } from "../Utilis/slugify";

import CategoryBar from "./CategoryBar";
import SubCategoryBar from "./SubCategoryBar";
import MenuItems from "./MenuItems";
import BackButton from "../BackArrow/BackButton";
import ItemPopup from "./ItemPopup";

function Menu() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const categories = useCategory();

  const [activeSub, setActiveSub] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const activeCategory = useMemo(() => {
    if (!categories.length) return null;
    return categories.find((c) => slugify(c.name) === categorySlug);
  }, [categories, categorySlug]);

  useEffect(() => {
    if (!categories.length) return;
    if (!activeCategory) navigate("/");
  }, [activeCategory, categories, navigate]);

  useEffect(() => {
    if (!activeCategory) return;

    const firstSub =
      activeCategory.subs?.find((s) => s.unavailable !== true) ||
      activeCategory.subs?.[0];

    setActiveSub(firstSub?.id || null);
  }, [activeCategory]);

  const { items, loading } = useMenu(activeCategory?.id, activeSub);

  if (!activeCategory) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="font-body min-h-screen bg-[#f8f1e7]">
      <BackButton />

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
        setSelectedItem={(item) => {
          const index = items.findIndex((i) => i.id === item.id);
          setSelectedIndex(index);
        }}
        activeCategory={activeCategory}
      />

      {/* POPUP COMPONENT */}
      <ItemPopup
        items={items}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}

export default Menu;