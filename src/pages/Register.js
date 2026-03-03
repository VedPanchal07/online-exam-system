import { useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Registered Successfully!");
      navigate("/");
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default Register;