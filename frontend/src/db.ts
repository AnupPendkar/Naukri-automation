import { openDB } from "idb";

// Initialize IndexedDB
const DB_NAME = "LinkedInBotDB";
const STORE_NAME = "inviteHistory";

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "profileUrl" });
      }
    },
  });
  return db;
}

// Save invite history to IndexedDB
export async function saveHistory(history) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  for (const entry of history) {
    await store.put(entry);
  }
  await tx.done;
}

// Load invite history from IndexedDB
export async function loadHistory() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}
