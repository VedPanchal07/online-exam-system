import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    const { data } = await supabase.from("exams").select("*");
    setExams(data);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 rounded-b-3xl shadow-md">
          <h1 className="text-4xl font-bold mb-2">
            Dashboard
          </h1>

          <p className="opacity-90">
            Welcome to your online exam portal. Select an exam and start testing your knowledge.
          </p>
        </div>


        <div className="max-w-6xl mx-auto p-8">

          {/* STATS + BUTTON */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

            <div className="bg-white p-6 rounded-2xl shadow w-full md:w-64">
              <h2 className="text-gray-500 text-sm">Total Exams</h2>
              <p className="text-3xl font-bold">{exams.length}</p>
            </div>

            <button
              onClick={() => navigate("/my-results")}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-md"
            >
              View My Results
            </button>

          </div>


          {/* EXAM GRID */}
          <h2 className="text-2xl font-bold mb-6">
            Available Exams
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {exams?.map((exam) => (
              <div
                key={exam.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {exam.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  Duration: {exam.duration} minutes
                </p>

                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Start Exam
                </button>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;