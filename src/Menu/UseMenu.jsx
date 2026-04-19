import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";

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

        const res = await safeRequest(() =>
          pb.collection("food_item").getList(1, 50, {
            filter,
            sort: "order",
          })
        );

        if (!ignore) {
          setItems(res.items);
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