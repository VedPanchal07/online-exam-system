import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email);

      if (user.email === "vedp62821@gmail.com") {
        setIsAdmin(true);
      }
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-8 text-white">

          <h1
            className="text-2xl font-bold cursor-pointer tracking-wide"
            onClick={() => navigate("/dashboard")}
          >
            Online Exam System
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/my-results")}
            className="hover:text-gray-200 transition"
          >
            My Results
          </button>

          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Admin
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          <div className="bg-white/20 px-4 py-1 rounded-lg text-white text-sm">
            {userEmail}
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;