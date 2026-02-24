import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        h-auto
        min-h-14
        bg-[#020617]
        border-b border-gray-700
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
        px-4
        sm:px-6
        py-2
        text-white
        shadow-md
      "
    >
      {/* LEFT — APP NAME */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="
          text-lg
          sm:text-xl
          font-semibold
          tracking-wide
          cursor-pointer
          hover:text-blue-400
          transition
        "
      >
        Trello
      </h1>

      {/* CENTER — DASHBOARD LINK */}
      <div
        onClick={() => navigate("/dashboard")}
        className="
          flex
          items-center
          gap-2
          cursor-pointer
          hover:text-blue-400
          transition
          text-xs
          sm:text-sm
          font-medium
        "
      >
        <LayoutDashboard size={18} />
        <span className="hidden sm:inline">Dashboard</span>
      </div>

      {/* RIGHT — USER SECTION */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1e293b] p-2 rounded-full">
            <User size={16} />
          </div>

          {/* Hide username on very small screens */}
          <span className="hidden sm:block text-sm font-medium">
            {user?.name || "User"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="
            flex
            items-center
            gap-1
            sm:gap-2
            bg-red-600
            hover:bg-red-700
            px-2
            sm:px-3
            py-1.5
            rounded-lg
            text-xs
            sm:text-sm
            transition
          "
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </div>
  );
}

export default Navbar;