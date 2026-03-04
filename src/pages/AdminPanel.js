import { useState } from "react";
import { supabase } from "../supabaseclient";
import Navbar from "../components/Navbar";

function AdminPanel() {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  async function addExam() {

    if (!title || !duration) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("exams").insert([
      {
        title,
        duration
      }
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } 
    else {
      alert("Exam Added Successfully!");

      setTitle("");
      setDuration("");
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        {/* Page Container */}
        <div className="max-w-6xl mx-auto">

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Admin Panel
          </h1>

          {/* Admin Form */}
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg">

            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Create New Exam
            </h2>

            {/* Exam Title */}
            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Duration */}
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Add Button */}
            <button
              onClick={addExam}
              disabled={loading}
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition font-semibold"
            >
              {loading ? "Adding Exam..." : "Add Exam"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminPanel;