import PocketBase from "pocketbase";

const pb = new PocketBase("https://bbirv.pockethost.io");

pb.autoCancellation(false);

// 🔥 AUTO TOKEN REFRESH FUNCTION
export async function refreshAuth() {
  if (pb.authStore.isValid) {
    try {
      await pb.collection("users").authRefresh();
    } catch (err) {
      console.log("Token expired, logging out...");
      pb.authStore.clear();
    }
  }
}

// 🔥 SAFE REQUEST WRAPPER
export async function safeRequest(requestFn) {
  try {
    return await requestFn();
  } catch (err) {
    if (err.status === 401) {
      try {
        await pb.collection("users").authRefresh();
        return await requestFn(); // retry
      } catch {
        pb.authStore.clear();
      }
    }
    throw err;
  }
}

export default pb;