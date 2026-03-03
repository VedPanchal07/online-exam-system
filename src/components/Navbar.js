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

      // 🔥 Change this email to your admin email
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
    <div className="bg-white shadow p-4 flex justify-between items-center">
      
      {/* Left Side */}
      <div className="flex gap-6 items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Online Exam System
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-black"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/my-results")}
          className="text-gray-600 hover:text-black"
        >
          My Results
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="text-blue-600 font-semibold"
          >
            Admin
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-600">
          {userEmail}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;