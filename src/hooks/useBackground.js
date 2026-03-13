import { useEffect, useState } from "react";
import pb from "../API/api";

export default function useBackground() {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const loadBackground = async () => {
      try {
        const records = await pb
          .collection("background_wrapper_image")
          .getFullList({ sort: "order" });

        if (records.length > 0 && records[0].image) {
          const url = pb.files.getUrl(records[0], records[0].image);
          console.log("Background URL:", url); // Debug
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
        loadBackground();
      });

    return () => {
      pb.collection("background_wrapper_image").unsubscribe();
    };
  }, []);

  return background;
}