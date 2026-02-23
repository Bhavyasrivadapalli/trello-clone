import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,   // ✅ ADD
} from "firebase/firestore";

// Create List
export const createList = async (boardId, title) => {
  await addDoc(collection(db, "lists"), {
    title,
    boardId,
    order: Date.now(),
  });
};

// Get Lists
export const getLists = async (boardId) => {
  const q = query(
    collection(db, "lists"),
    where("boardId", "==", boardId),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// ✅ EDIT LIST TITLE
export const updateList = async (listId, newTitle) => {
  await updateDoc(doc(db, "lists", listId), {
    title: newTitle,
  });
};

// Delete List
export const deleteList = async (listId) => {
  await deleteDoc(doc(db, "lists", listId));
};