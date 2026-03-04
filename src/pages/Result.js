import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total } = location.state || {};

  const percentage = total ? Math.round((score / total) * 100) : 0;

  const passed = percentage >= 50;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-10 text-center">

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6">
            Exam Result
          </h1>

          {/* Score Circle */}
          <div className="flex justify-center mb-6">

            <div className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold text-white
            bg-blue-500 shadow-lg">

              {percentage}%

            </div>

          </div>


          {/* Score Info */}
          <p className="text-lg mb-2">
            Your Score
          </p>

          <p className="text-2xl font-semibold mb-6">
            {score} / {total}
          </p>


          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">

            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>

          </div>


          {/* Pass / Fail Message */}
          {passed ? (

            <p className="text-green-600 font-semibold text-lg mb-6">
              🎉 Congratulations! You passed the exam.
            </p>

          ) : (

            <p className="text-red-500 font-semibold text-lg mb-6">
              ❌ Keep practicing! Try again to improve your score.
            </p>

          )}


          {/* Buttons */}
          <div className="flex justify-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Review
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default Result;