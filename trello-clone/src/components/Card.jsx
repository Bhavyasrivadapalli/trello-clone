import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, Check } from "lucide-react";

/* ⭐ added onClick */
function Card({ card, onDelete, onUpdate, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  /* ---------- DND ---------- */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(card.id, title);
    setIsEditing(false);
  };

  /* ⭐ OPEN MODAL SAFELY */
  const handleCardClick = (e) => {
    if (isEditing) return; // don't open while editing
    if (onClick) onClick(card);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleCardClick}
      className="
        bg-[#0f172a]
        text-white
        p-3
        rounded-lg
        border border-gray-700
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-[2px]
        transition
        cursor-grab
        group
      "
    >
      {isEditing ? (
        <div
          className="space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              bg-[#020617]
              border border-gray-600
              rounded-md
              p-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            autoFocus
          />

          <button
            onClick={handleSave}
            className="
              flex items-center gap-1
              text-green-400
              text-sm
              hover:text-green-300
            "
          >
            <Check size={16} />
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          {/* TITLE */}
          <p className="text-sm font-medium leading-snug">
            {card.title}
          </p>

          {/* ACTIONS */}
          <div
            className="
              flex gap-2
              opacity-0
              group-hover:opacity-100
              transition
            "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="hover:text-blue-400"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              className="hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;