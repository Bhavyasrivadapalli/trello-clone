import { loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chrome } from "lucide-react";

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
  };

  /* Auto redirect */
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div
      className="
        h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#020617]
        via-[#0f172a]
        to-[#1e293b]
        text-white
      "
    >
      {/* LOGIN CARD */}
      <div
        className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          shadow-2xl
          rounded-2xl
          p-10
          w-[380px]
          text-center
        "
      >
        {/* APP NAME */}
        <h1 className="text-3xl font-semibold mb-2 tracking-wide">
          Trello
        </h1>

        <p className="text-gray-400 mb-8 text-sm">
          Organize your work. Manage your boards.
        </p>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-blue-600
            hover:bg-blue-700
            transition
            py-3
            rounded-lg
            font-medium
            shadow-lg
          "
        >
          <Chrome size={18} />
          Sign in with Google
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 mt-6">
          Powered by Firebase Authentication
        </p>
      </div>
    </div>
  );
}

export default LoginPage;