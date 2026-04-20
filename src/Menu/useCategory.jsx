import { useEffect, useState } from "react";
import pb, { safeRequest, cache } from "../API/api";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {

        // ✅ GLOBAL CACHE
        if (cache.categories) {
          setCategories(cache.categories);
          return;
        }

        const [catRes, subRes] = await Promise.all([
          safeRequest(() =>
            pb.collection("category").getFullList()
          ),
          safeRequest(() =>
            pb.collection("sub_category").getFullList()
          ),
        ]);

        const merged = catRes.map((c) => ({
          ...c,
          subs: subRes.filter((s) => s.categoryId === c.id),
        }));

        cache.categories = merged; // 🔥 SAVE CACHE
        setCategories(merged);

      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return categories;
}