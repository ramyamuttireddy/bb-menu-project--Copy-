import { useEffect, useState } from "react";
import pb, { safeRequest, cache } from "../API/api";

export default function useMenu(categoryId, subCategoryId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    let ignore = false;

    const key = `${categoryId}-${subCategoryId || "all"}`;

    const load = async () => {
      try {
        setLoading(true);

        // ✅ CACHE CHECK
        if (cache.menu[key]) {
          setItems(cache.menu[key]);
          setLoading(false);
          return;
        }

        let filter = `categoryId="${categoryId}"`;
        if (subCategoryId) {
          filter += ` && subCategoryId="${subCategoryId}"`;
        }

        const res = await safeRequest(() =>
          pb.collection("food_item").getFullList({
            filter,
            sort: "order",
          })
        );

        if (!ignore) {
          cache.menu[key] = res; // 🔥 SAVE CACHE
          setItems(res);
        }

      } catch (err) {
        console.log(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [categoryId, subCategoryId]);

  return { items, loading };
}