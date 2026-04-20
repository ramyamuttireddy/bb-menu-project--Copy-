import pb, { safeRequest } from "./api";

// ✅ CATEGORY
export const fetchCategories = async () => {
  const res = await safeRequest(() =>
    pb.collection("category").getList(1, 50, { sort: "order" })
  );
  return res.items;
};

// ✅ SUB CATEGORY
export const fetchSubCategories = async () => {
  const res = await safeRequest(() =>
    pb.collection("sub_category").getList(1, 100, { sort: "order" })
  );
  return res.items;
};

// ✅ FOOD ITEMS
export const fetchFoodItems = async (filter) => {
  const res = await safeRequest(() =>
    pb.collection("food_item").getList(1, 100, {
      filter,
      sort: "order",
    })
  );
  return res.items;
};

// ✅ NEW ITEMS
export const fetchNewItems = async () => {
  const res = await safeRequest(() =>
    pb.collection("food_item").getList(1, 20, {
      filter: "new_addition=true",
      sort: "-created",
      expand: "categoryId",
    })
  );
  return res.items;
};

// ✅ NOTICES
export const fetchNotices = async () => {
  const res = await safeRequest(() =>
    pb.collection("notices").getList(1, 20, {
      sort: "-created",
    })
  );
  return res.items;
};

// ✅ RESTAURANT IMAGES
export const fetchRestaurantImages = async () => {
  const res = await safeRequest(() =>
    pb.collection("restaurant_images").getList(1, 20)
  );
  return res.items;
};