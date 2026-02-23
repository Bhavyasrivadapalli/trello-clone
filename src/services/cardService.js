import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const cardsRef = collection(db, "cards");


// ✅ GET ALL CARDS
export const getAllCards = async () => {
  const snapshot = await getDocs(cardsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// ✅ CREATE CARD
export const createCard = async (listId, title) => {
  await addDoc(cardsRef, {
    listId,
    title,
    order: Date.now(), // important for sorting
  });
};


// ✅ DELETE CARD
export const deleteCard = async (cardId) => {
  await deleteDoc(doc(db, "cards", cardId));
};


// ✅ UPDATE CARD TITLE (EDIT)
export const updateCard = async (cardId, newTitle) => {
  await updateDoc(doc(db, "cards", cardId), {
    title: newTitle,
  });
};


// ✅ MOVE CARD TO NEW LIST (DnD)
export const updateCardList = async (cardId, newListId) => {
  await updateDoc(doc(db, "cards", cardId), {
    listId: newListId,
  });
};


// ✅ UPDATE CARD ORDER (DnD SORT)
export const updateCardOrder = async (cardId, newOrder) => {
  await updateDoc(doc(db, "cards", cardId), {
    order: newOrder,
  });
};