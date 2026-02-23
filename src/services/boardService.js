import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Create Board
export const createBoard = async (userId, title) => {
  const ref = await addDoc(collection(db, "boards"), {
    title,
    userId,
    createdAt: new Date(),
  });

  return ref.id;
};

// Fetch Boards
export const getBoards = async (userId) => {
  const q = query(
    collection(db, "boards"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// Delete Board
export const deleteBoard = async (boardId) => {
  await deleteDoc(doc(db, "boards", boardId));
};