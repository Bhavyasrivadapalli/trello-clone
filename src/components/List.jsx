import {
  createCard,
  deleteCard,
  updateCard,
} from "../services/cardService";

import { Pencil, Trash2, Check } from "lucide-react";
import { deleteList, updateList } from "../services/listService";

import Card from "./Card";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function List({ list, cards, reload, onCardClick }) {

  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);

  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { type: "list", list },
  });

  const handleCreateCard = async () => {
    if (!title.trim()) return;
    await createCard(list.id, title);
    setTitle("");
    reload();
  };

  const handleDelete = async (id) => {
    await deleteCard(id);
    reload();
  };

  const handleUpdate = async (id, newTitle) => {
    await updateCard(id, newTitle);
    reload();
  };

  const handleSaveList = async () => {
    if (!listTitle.trim()) return;
    await updateList(list.id, listTitle);
    setIsEditing(false);
    reload();
  };

  const handleDeleteList = async () => {
    await deleteList(list.id);
    reload();
  };

  return (
    <div
      ref={setNodeRef}
      className="
        bg-[#1e293b]
        text-white
        p-4
        rounded-xl
        min-w-[260px]
        sm:min-w-[288px]
        flex-shrink-0
        min-h-[420px]
        shadow-xl
        flex
        flex-col
        border border-gray-700
      "
    >
      {/* HEADER */}
      {isEditing ? (
        <div className="flex gap-2 mb-4">
          <input
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2"
            autoFocus
          />
          <button onClick={handleSaveList}>
            <Check size={18} />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4 group">
          <h2 className="font-semibold text-base sm:text-lg break-words">
            {list.title}
          </h2>

          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
            <button onClick={() => setIsEditing(true)}>
              <Pencil size={18} />
            </button>

            <button onClick={handleDeleteList}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* CARDS */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onClick={onCardClick}
            />
          ))}
        </SortableContext>
      </div>

      {/* ADD CARD */}
      <div className="mt-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a card..."
          className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2"
        />

        <button
          onClick={handleCreateCard}
          className="
            w-full
            mt-3
            bg-blue-600
            hover:bg-blue-700
            py-2
            rounded-lg
          "
        >
          Add Card
        </button>
      </div>
    </div>
  );
}

export default List;