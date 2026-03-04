import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import useCountUp from "../hooks/useCountUp";

function Dashboard() {
  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({
    exams: 0,
    attempts: 0,
    avgScore: 0
  });

  const navigate = useNavigate();

  // ✅ Animated counters
  const examsCount = useCountUp(stats.exams);
  const attemptsCount = useCountUp(stats.attempts);
  const avgScoreCount = useCountUp(stats.avgScore);

  useEffect(() => {
    fetchExams();
    fetchStats();
  }, []);

  async function fetchExams() {
    const { data } = await supabase.from("exams").select("*");
    setExams(data);
  }

  async function fetchStats() {
    const { count: examCount } = await supabase
      .from("exams")
      .select("*", { count: "exact", head: true });

    const { data: { user } } = await supabase.auth.getUser();

    const { data: results } = await supabase
      .from("results")
      .select("score")
      .eq("user_id", user.id);

    let avg = 0;

    if (results && results.length > 0) {
      const total = results.reduce((a, b) => a + b.score, 0);
      avg = Math.round(total / results.length);
    }

    setStats({
      exams: examCount || 0,
      attempts: results?.length || 0,
      avgScore: avg
    });
  }

  return (
    <>
      <Background/>
      <Navbar />

      <div className="min-h-screen">

        {/* HERO HEADER */}
        <div className="backdrop-blur-md bg-white/40 border-b border-white/20 p-10 rounded-b-3xl shadow-md">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-700">
            Welcome to your online exam portal. Select an exam and start testing your knowledge.
          </p>
        </div>

        <div className="max-w-7xl mx-auto p-8">

          {/* STATS + BUTTON */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="glass-card text-center p-6">
                <h3 className="text-lg font-semibold">Total Exams</h3>
                <p className="text-3xl font-bold text-indigo-600">{examsCount}</p>
              </div>

              <div className="glass-card text-center p-6">
                <h3 className="text-lg font-semibold">Attempts</h3>
                <p className="text-3xl font-bold text-purple-600">{attemptsCount}</p>
              </div>

              <div className="glass-card text-center p-6">
                <h3 className="text-lg font-semibold">Average Score</h3>
                <p className="text-3xl font-bold text-blue-600">{avgScoreCount}</p>
              </div>

            </div>

            <button
              onClick={() => navigate("/my-results")}
              className="btn-3d bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 shadow-lg"
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
              <div key={exam.id} className="glass-card exam-card p-6">
                <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                <p className="text-gray-600 mb-4">Duration: {exam.duration} minutes</p>
                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="w-full btn-3d bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
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