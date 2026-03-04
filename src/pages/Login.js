import { useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import useRedirect from "../hooks/useRedirect";
import RedirectLoader from "../components/RedirectLoader";

function Login() {
  const { redirect, redirecting } = useRedirect();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <>
      {redirecting && <RedirectLoader />}
    <Background/>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="grid md:grid-cols-2 glass-card overflow-hidden max-w-5xl w-full">

          {/* LEFT SIDE INFO */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-blue-600 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Online Exam System
            </h1>

            <p className="text-lg opacity-90">
              Take exams easily, track your results, and improve your knowledge
              with our secure online examination platform.
            </p>

            <div className="mt-8 space-y-2 text-sm opacity-80">
              <p>✔ Secure login</p>
              <p>✔ Timed examinations</p>
              <p>✔ Instant results</p>
              <p>✔ Attempt history</p>
            </div>
          </div>


          {/* RIGHT SIDE LOGIN FORM */}
          <div className="p-10 flex flex-col justify-center">

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}

export default Login;