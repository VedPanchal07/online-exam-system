import { useState } from "react";
import { supabase } from "../supabaseclient";
import Navbar from "../components/Navbar";
function Admin() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  async function createExam() {
    if (!title || !duration) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("exams").insert([
      {
        title: title,
        duration: parseInt(duration),
      },
    ]);

    if (error) {
      alert("Error creating exam");
    } else {
      alert("Exam created successfully!");
      setTitle("");
      setDuration("");
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-white p-6 rounded-xl shadow w-96">
        <input
          type="text"
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={createExam}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Create Exam
        </button>
      </div>
    </div>
    </>
  );
}

export default Admin;