import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";
import { throttledRequest } from "../API/cache";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = sessionStorage.getItem("categories");

        if (cached) {
          setCategories(JSON.parse(cached));
          return;
        }

        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        const [catRes, subRes] = await Promise.all([
          throttledRequest(() =>
            safeRequest(() =>
              pb.collection("category").getList(1, 50, { sort: "order" })
            )
          ),
          throttledRequest(() =>
            safeRequest(() =>
              pb.collection("sub_category").getList(1, 100, { sort: "order" })
            )
          ),
        ]);

        const cat = catRes.items;
        const sub = subRes.items;

        const merged = cat.map((c) => {
          const isDayUnavailable = c.unavailableDays?.includes(today);

          return {
            ...c,
            unavailable: c.unavailable || isDayUnavailable,
            subs: sub
              .filter((s) => s.categoryId === c.id)
              .map((s) => ({
                ...s,
                unavailable: s.unavailable || isDayUnavailable,
              })),
          };
        });

        setCategories(merged);
        sessionStorage.setItem("categories", JSON.stringify(merged));

      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return categories;
}