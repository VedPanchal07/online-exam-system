import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const safeFetchResults = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("results")
        .select(`
          id,
          score,
          user_id,
          attempt_date,
          exam_id,
          exam_title
        `)
        .eq("user_id", user.id)
        .order("attempt_date", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.log("Error fetching results:", error);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };

    safeFetchResults();

    return () => { isMounted = false };
  }, [navigate]);

  async function fetchResults() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
      return;
    }

    // Fetch results along with exam titles
    const { data, error } = await supabase
      .from("results")
      .select(`
        id,
        score,
        user_id,
        attempt_date,
        exam_id,
        exam_title
      `)
      .eq("user_id", user.id)
      .order("attempt_date", { ascending: false });

    if (error) {
      console.log("Error fetching results:", error);
    } else {
      setResults(data || []);
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">My Results</h1>

        {loading && <p className="text-gray-500">Loading results...</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-600">You haven't attempted any exams yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {r.exam_title || "Unknown Exam"}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Attempted on: {new Date(r.attempt_date).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                Exam ID: {r.exam_id}
              </p>
              <p className="text-gray-600 text-sm">
                Score: {r.score}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyResults;