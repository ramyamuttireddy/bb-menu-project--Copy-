import { useEffect, useState } from "react";
import pb from "../API/api";
import { cachedRequest } from "../API/cache";

export default function useBackground() {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const loadBackground = async () => {
      try {
        const records = await cachedRequest("background_images", () =>
          pb.collection("background_wrapper_image").getFullList({ sort: "order" })
        );

        if (records.length > 0 && records[0].image) {
          const url = pb.files.getUrl(records[0], records[0].image);
          setBackground(url);
        }
      } catch (err) {
        console.error("Background Error:", err);
      }
    };

    loadBackground();

    const unsubscribe = pb
      .collection("background_wrapper_image")
      .subscribe("*", () => {
        // Clear cache on realtime update so next load fetches fresh
        localStorage.removeItem("background_images");
        loadBackground();
      });

    return () => {
      pb.collection("background_wrapper_image").unsubscribe();
    };
  }, []);

  return background;
}