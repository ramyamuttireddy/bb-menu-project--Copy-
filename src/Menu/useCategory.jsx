import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          cachedRequest("categories_list", () =>
            safeRequest(() =>
              pb.collection("category").getFullList({ sort: "order" })
            )
          ),
          cachedRequest("subcategories_list", () =>
            safeRequest(() =>
              pb.collection("sub_category").getFullList({ sort: "order" })
            )
          ),
        ]);

        const merged = catRes.map((c) => ({
          ...c,
          subs: subRes.filter((s) => s.categoryId === c.id),
        }));

        setCategories(merged);

      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return categories;
}