import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseclient";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import useRedirect from "../hooks/useRedirect";
import RedirectLoader from "../components/RedirectLoader";

function Exam() {
  const { redirect, redirecting } = useRedirect();
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  // ✅ Submit exam
  const submitExam = useCallback(async () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) score++;
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in");
      return;
    }

    const { data: examData, error: examError } = await supabase
      .from("exams")
      .select("title")
      .eq("id", id)
      .single();

    if (examError) {
      console.log("Error fetching exam title:", examError);
      return;
    }

    const { error } = await supabase.from("results").insert([
      {
        user_id: user.id,
        exam_id: id,
        exam_title: examData.title,
        score,
        attempt_date: new Date(),
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error saving result");
      return;
    }

    navigate("/result", { state: { score, total: questions.length } });

  }, [answers, questions, id, navigate]);

  // ✅ Timer
  useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }

        return prev - 1;

      });
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, submitExam]);

  // ✅ Check attempts and load questions
  useEffect(() => {
    let isMounted = true;

    const loadExam = async () => {

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data } = await supabase
        .from("results")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_id", id);

      if (!isMounted) return;

      if (data.length >= 5) {
        alert("You have already attempted this exam 5 times.");
        redirect("/dashboard");
        return;
      }

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", id);

      if (!isMounted) return;

      setQuestions(questionsData || []);

      const { data: examData } = await supabase
        .from("exams")
        .select("duration")
        .eq("id", id)
        .single();

      if (!isMounted) return;

      if (examData) setTimeLeft(examData.duration * 60);
    };

    loadExam();

    return () => {
      isMounted = false;
    };

  }, [navigate, id, redirect]);

  return (
<>
    {redirecting && <RedirectLoader />}
<Background/>
<Navbar />

<div className="min-h-screen bg-gray-100">

{/* TOP BAR */}
<div className="bg-white shadow-md sticky top-0 z-10">
<div className="max-w-5xl mx-auto flex justify-between items-center p-4">

<h1 className="text-xl font-bold">
Online Exam
</h1>

<div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
⏱ {Math.floor(timeLeft / 60)}:
{String(timeLeft % 60).padStart(2, "0")}
</div>

</div>
</div>



{/* EXAM CONTENT */}
<div className="max-w-6xl mx-auto p-6">

{questions.map((q, index) => (

<div
key={q.id}
className="glass-card exam-card p-6 mb-8"
>

{/* QUESTION NUMBER */}
<h2 className="text-lg font-semibold mb-3">
Question {index + 1}
</h2>

<p className="text-gray-800 font-medium mb-4">
{q.question_text}
</p>



{/* OPTIONS */}
<div className="space-y-3">

{["option_a","option_b","option_c","option_d"].map((opt) => {

const value = opt.slice(-1).toUpperCase();

return (

<label
key={opt}
className={`block border rounded-xl p-3 cursor-pointer transition hover:scale-[1.01] hover:bg-blue-50
${answers[q.id] === value ? "border-blue-500 bg-blue-50" : "border-gray-200"}
`}
>

<input
type="radio"
name={q.id}
value={value}
className="mr-3"
onChange={(e) =>
setAnswers({ ...answers, [q.id]: e.target.value })
}
/>

{q[opt]}

</label>

);

})}

</div>

</div>

))}



{/* SUBMIT SECTION */}
<div className="text-center mt-10">

<button
onClick={submitExam}
className="btn-3d bg-green-500 text-white px-10 py-3 rounded-xl text-lg font-semibold hover:bg-green-600 shadow-lg"
>
Submit Exam
</button>

</div>

</div>

</div>

</>
);
}

export default Exam;