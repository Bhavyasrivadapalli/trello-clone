import { X, CalendarDays, Users, Tag } from "lucide-react";
import { useState } from "react";

function CardModal({ card, onClose }) {

  /* ---------- DEFAULT DESCRIPTION ---------- */
  const defaultDescription =
    "This card represents a task inside the board. Add notes, requirements or progress details here.";

  const [description, setDescription] = useState(
    card.description || defaultDescription
  );

  /* ---------- DUMMY UNIVERSAL DATA ---------- */
  const meta = {
    labels: card.labels || ["Task"],
    dueDate: card.dueDate || "25 May 2026",

    members:
      card.members || [
        { name: "Bhavyasri", color: "bg-blue-500" },
        { name: "Alex", color: "bg-purple-500" },
        { name: "Jordan", color: "bg-green-500" },
      ],

    activity: [
      "Card created",
      "Assigned to team",
      "Awaiting progress update",
    ],
  };

  if (!card) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-[#020617]
          text-white
          w-[750px]
          rounded-xl
          p-6
          shadow-2xl
          relative
          flex gap-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 hover:text-red-400"
        >
          <X />
        </button>

        {/* ---------- LEFT SECTION ---------- */}
        <div className="flex-1 space-y-6">

          <h2 className="text-2xl font-semibold">
            {card.title}
          </h2>

          {/* DESCRIPTION */}
          <div>
            <h3 className="text-sm text-gray-400 mb-2">
              Description
            </h3>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                h-32
                bg-[#0f172a]
                border border-gray-700
                rounded-lg
                p-3
                focus:outline-none
              "
            />
          </div>

          {/* ACTIVITY */}
          <div>
            <h3 className="text-sm text-gray-400 mb-2">
              Activity
            </h3>

            {meta.activity.map((a, i) => (
              <div
                key={i}
                className="bg-[#0f172a] p-2 rounded text-sm mb-2"
              >
                {a}
              </div>
            ))}
          </div>

        </div>

        {/* ---------- RIGHT SIDEBAR ---------- */}
        <div className="w-56 space-y-6">

          {/* LABELS */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2 flex gap-2">
              <Tag size={16}/> Labels
            </h4>

            <div className="flex flex-wrap gap-2">
              {meta.labels.map((l, i) => (
                <span
                  key={i}
                  className="bg-indigo-600 px-2 py-1 text-xs rounded"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* MEMBERS */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2 flex gap-2">
              <Users size={16}/> Members
            </h4>

            <div className="flex -space-x-2">
              {meta.members.map((m, i) => (
                <div
                  key={i}
                  title={m.name}
                  className={`
                    ${m.color}
                    w-9 h-9
                    rounded-full
                    flex items-center justify-center
                    text-sm font-bold
                    border-2 border-[#020617]
                  `}
                >
                  {m.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>

          {/* DUE DATE */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2 flex gap-2">
              <CalendarDays size={16}/> Due Date
            </h4>

            <div className="bg-[#0f172a] p-2 rounded text-sm">
              {meta.dueDate}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardModal;