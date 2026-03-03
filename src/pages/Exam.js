import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  // ✅ Call checkAttempt on page load
  // ✅ Safe checkAttempt on page load
  useEffect(() => {
    let isMounted = true;

    const safeCheckAttempt = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      // Check attempts
      const { data } = await supabase
        .from("results")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_id", id);

      if (!isMounted) return;

      if (data.length >= 5) {
        alert("You have already attempted this exam 5 times.");
        navigate("/dashboard");
        return;
      }

      fetchQuestions();
    };

    safeCheckAttempt();

    return () => { isMounted = false };
  }, [navigate, id]);

  // ✅ Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  async function checkAttempt() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    navigate("/");
    return;
  }

  // 🔥 Check how many times user has attempted this exam
  const { data } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .eq("exam_id", id);

  if (data.length >= 5) {
    alert("You have already attempted this exam 5 times.");
    navigate("/dashboard");
    return;
  }

  // If less than 5 attempts → load questions
  fetchQuestions();
}

  async function fetchQuestions() {
    // Get questions
    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("exam_id", id);

    setQuestions(data);

    // Get exam duration
    const { data: examData } = await supabase
      .from("exams")
      .select("duration")
      .eq("id", id)
      .single();

    if (examData) {
      setTimeLeft(examData.duration * 60);
    }
  }

 async function submitExam() {
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correct_answer) score++;
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("User not logged in");
    return;
  }

  // 🔥 Fetch exam title before inserting
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
      exam_title: examData.title, // store title
      score: score,
      attempt_date: new Date(),  // store attempt timestamp
    },
  ]);

  if (error) {
    console.log(error);
    alert("Error saving result");
    return;
  }

  navigate("/result", { state: { score, total: questions.length } });
}

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">

      {/* ✅ TIMER */}
      <div className="mb-6 text-right text-red-600 font-bold text-lg">
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>

      <h1 className="text-2xl font-bold mb-6">Exam</h1>

      {questions.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow mb-6">
          <p className="font-semibold mb-4">{q.question_text}</p>

          {["option_a", "option_b", "option_c", "option_d"].map((opt) => (
            <label key={opt} className="block mb-2">
              <input
                type="radio"
                name={q.id}
                value={opt.slice(-1).toUpperCase()} // "option_a" → "A"
                onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />
              <span className="ml-2">{q[opt]}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitExam}
        className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600"
      >
        Submit Exam
      </button>
    </div>
    </>
  );
}

export default Exam;