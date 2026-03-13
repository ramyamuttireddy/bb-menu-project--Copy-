import { useEffect, useState } from "react";
import pb from "../API/api";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        const cat = await pb.collection("category").getFullList({
          sort: "order",
        });

        const sub = await pb.collection("sub_category").getFullList({
          sort: "order",
        });

        const merged = cat.map((c) => {
          const isDayUnavailable =
            c.unavailableDays?.includes(today);

          return {
            ...c,
            unavailable:
              c.unavailable === true || isDayUnavailable,
            subs: sub
              .filter((s) => s.categoryId === c.id)
              .map((s) => ({
                ...s,
                unavailable:
                  s.unavailable === true || isDayUnavailable,
              })),
          };
        });

        setCategories(merged);
      } catch (err) {
        console.log(err);
      }
    };

    load();

    pb.collection("category").subscribe("*", () => load());
    pb.collection("sub_category").subscribe("*", () => load());

    return () => {
      pb.collection("category").unsubscribe();
      pb.collection("sub_category").unsubscribe();
    };
  }, []);

  return categories;
}