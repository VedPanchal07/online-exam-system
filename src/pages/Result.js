import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Exam Result</h1>
        <p className="text-xl">
          Your Score: <span className="font-bold">{score}</span> / {total}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
    </>
  );
}

export default Result;