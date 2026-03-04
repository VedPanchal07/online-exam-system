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
      alert("Registration successful! Please check your email to verify.");
      navigate("/");
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center p-6">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Join the Online Exam Portal
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-xs text-gray-400 mt-1">
                Use at least 6 characters
              </p>
            </div>


            {/* REGISTER BUTTON */}
            <button
              className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition font-semibold shadow-md"
            >
              Create Account
            </button>

          </form>


          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </>
  );
}

export default Register;