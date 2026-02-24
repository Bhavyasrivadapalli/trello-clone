import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../services/authService";
import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import { createList, getLists } from "../services/listService";
import {
  updateCardList,
  updateCardOrder,
  getAllCards,
} from "../services/cardService";

import List from "../components/List";
import CardModal from "../components/CardModal";
import Navbar from "../layouts/Navbar";

function BoardPage() {
  const { id: boardId } = useParams();

  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  /* ⭐ REAL LOGGED USER */
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await logoutUser();
  };

  /* ---------- Firebase User Listener ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  /* ---------- Sensors ---------- */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  /* ---------- Load Data ---------- */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const listsData = await getLists(boardId);
    const cardsData = await getAllCards();

    setLists(listsData);
    setCards(cardsData);
  };

  const handleCreateList = async () => {
    if (!title.trim()) return;

    await createList(boardId, title);
    setTitle("");
    loadData();
  };

  const handleDragStart = ({ active }) => {
    const card = cards.find((c) => c.id === active.id);
    setActiveCard(card);
  };

  const handleDragEnd = async ({ active, over }) => {
    setActiveCard(null);

    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    const draggedCard = cards.find((c) => c.id === active.id);
    if (!draggedCard) return;

    if (activeType === "card" && overType === "list") {
      await updateCardList(active.id, over.id);
      await updateCardOrder(active.id, Date.now());
    }

    if (activeType === "card" && overType === "card") {
      const targetCard = cards.find((c) => c.id === over.id);

      await updateCardList(active.id, targetCard.listId);
      await updateCardOrder(active.id, Date.now());
    }

    loadData();
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="h-[calc(100vh-56px)] flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden px-3 sm:px-6 py-4 bg-[#0f172a] text-white">
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              cards={cards
                .filter((card) => card.listId === list.id)
                .sort((a, b) => a.order - b.order)}
              reload={loadData}
              onCardClick={setSelectedCard}
            />
          ))}

          <div className="min-w-[260px] sm:min-w-[288px] flex-shrink-0 bg-[#1e293b] p-4 rounded-xl shadow-lg h-fit">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New List"
              className="w-full p-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white"
            />

            <button
              onClick={handleCreateList}
              className="bg-blue-600 hover:bg-blue-700 mt-3 px-4 py-2 rounded-lg w-full"
            >
              Add List
            </button>
          </div>
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="bg-[#1e293b] text-white p-2 rounded-lg shadow-2xl border border-gray-600">
              {activeCard.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}

export default BoardPage;