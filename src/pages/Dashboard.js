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
    <Navbar/>
  <div className="min-h-screen bg-gray-100 p-8">

    {/* 🔥 Header Section */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Available Exams</h1>

      <button
        onClick={() => navigate("/my-results")}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
      >
        My Results
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {exams?.map((exam) => (
        <div
          key={exam.id}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">{exam.title}</h2>
          <p className="text-gray-600">
            Duration: {exam.duration} mins
          </p>

          <button
            onClick={() => navigate(`/exam/${exam.id}`)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Start Exam
          </button>
        </div>
      ))}
    </div>
  </div>
  </>
);
}

export default Dashboard;