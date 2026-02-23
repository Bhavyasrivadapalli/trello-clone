import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createBoard,
  getBoards,
  deleteBoard,
} from "../services/boardService";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { Plus, Trash2 } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  /* ---------- LOAD BOARDS ---------- */
  useEffect(() => {
    if (user) loadBoards();
  }, [user]);

  const loadBoards = async () => {
    const data = await getBoards(user.uid);
    setBoards(data);
  };

  /* ---------- CREATE ---------- */
  const handleCreate = async () => {
    if (!title.trim()) return;

    await createBoard(user.uid, title);
    setTitle("");
    loadBoards();
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    await deleteBoard(id);
    loadBoards();
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* WORKSPACE */}
      <div className="min-h-[calc(100vh-56px)] bg-[#0f172a] text-white p-10">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-8">
          Your Boards
        </h1>

        {/* BOARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* CREATE BOARD CARD */}
          <div className="
              bg-[#1e293b]
              border border-gray-700
              rounded-xl
              p-5
              flex flex-col
              gap-3
              justify-center
              shadow-lg
            "
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create new board..."
              className="
                bg-[#020617]
                border border-gray-600
                rounded-lg
                p-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              onClick={handleCreate}
              className="
                flex items-center justify-center gap-2
                bg-blue-600
                hover:bg-blue-700
                transition
                py-2
                rounded-lg
                font-medium
              "
            >
              <Plus size={18}/>
              Create Board
            </button>
          </div>

          {/* BOARDS */}
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
              className="
                relative
                bg-gradient-to-br
                from-indigo-500
                to-purple-600
                rounded-xl
                p-6
                shadow-lg
                cursor-pointer
                hover:scale-105
                hover:shadow-2xl
                transition
                group
              "
            >
              <h2 className="text-lg font-semibold">
                {board.title}
              </h2>

              {/* DELETE ICON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(board.id);
                }}
                className="
                  absolute
                  top-3
                  right-3
                  opacity-0
                  group-hover:opacity-100
                  transition
                  hover:text-red-300
                "
              >
                <Trash2 size={18}/>
              </button>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Dashboard;