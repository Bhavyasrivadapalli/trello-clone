import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div
      className="
      h-14
      bg-[#020617]
      border-b border-gray-700
      flex
      items-center
      justify-between
      px-6
      text-white
      shadow-md
    "
    >
      {/* LEFT - APP NAME */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="
          text-xl
          font-semibold
          tracking-wide
          cursor-pointer
          hover:text-blue-400
          transition
        "
      >
        Trello
      </h1>

      {/* CENTER - DASHBOARD LINK */}
      <div
        onClick={() => navigate("/dashboard")}
        className="
          flex items-center gap-2
          cursor-pointer
          hover:text-blue-400
          transition
          text-sm
          font-medium
        "
      >
        <LayoutDashboard size={18} />
        Dashboard
      </div>

      {/* RIGHT - USER SECTION */}
      <div className="flex items-center gap-4">

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1e293b] p-2 rounded-full">
            <User size={18} />
          </div>

          <span className="text-sm font-medium">
            {user?.name || "User"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="
            flex items-center gap-2
            bg-red-600
            hover:bg-red-700
            px-3
            py-1.5
            rounded-lg
            text-sm
            transition
          "
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;