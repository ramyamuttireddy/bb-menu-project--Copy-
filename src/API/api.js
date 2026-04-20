import PocketBase from "pocketbase";

const pb = new PocketBase("https://bbirv.pockethost.io");

// 🔥 VERY IMPORTANT
pb.autoCancellation(false);

// 🔥 CACHE STORE (GLOBAL)
const cache = {
  categories: null,
  menu: {},
};

// 🔥 TOKEN REFRESH
export async function refreshAuth() {
  if (pb.authStore.isValid) {
    try {
      await pb.collection("users").authRefresh();
    } catch {
      pb.authStore.clear();
    }
  }
}

// 🔥 SAFE REQUEST + RETRY
export async function safeRequest(requestFn, retries = 3) {
  try {
    return await requestFn();
  } catch (err) {
    if (retries > 0) {
      await new Promise((res) => setTimeout(res, 500)); // wait
      return safeRequest(requestFn, retries - 1);
    }

    if (err.status === 401) {
      try {
        await pb.collection("users").authRefresh();
        return await requestFn();
      } catch {
        pb.authStore.clear();
      }
    }

    throw err;
  }
}

export { cache };
export default pb;