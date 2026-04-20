import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";

export default function useMenu(categoryId, subCategoryId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);

        let filter = `categoryId="${categoryId}"`;
        if (subCategoryId) {
          filter += ` && subCategoryId="${subCategoryId}"`;
        }

        const cacheKey = `menu_${categoryId}_${subCategoryId || "all"}`;

        const res = await cachedRequest(cacheKey, () =>
          safeRequest(() =>
            pb.collection("food_item").getFullList({
              filter,
              sort: "order",
            })
          )
        );

        if (!ignore) {
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