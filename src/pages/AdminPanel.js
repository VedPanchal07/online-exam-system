import { useState } from "react";
import { supabase } from "../supabaseclient";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  async function addExam() {
    const { error } = await supabase.from("exams").insert([
      { title, duration },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Exam Added!");
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-white p-6 rounded-2xl shadow w-96">
        <input
          type="text"
          placeholder="Exam Title"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (mins)"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setDuration(e.target.value)}
        />

        <button
          onClick={addExam}
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
        >
          Add Exam
        </button>
      </div>
    </div>
    </>
  );
}

export default AdminPanel;