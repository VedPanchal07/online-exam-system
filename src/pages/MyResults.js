import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Loader from "../components/Loader";
import useRedirect from "../hooks/useRedirect";
import RedirectLoader from "../components/RedirectLoader";

function MyResults() {
  const { redirect, redirecting } = useRedirect();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;

  const safeFetchResults = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect("/"); // ✅ safe to call once
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

    if (error) console.log("Error fetching results:", error);
    else setResults(data || []);

    setLoading(false);
  };

  safeFetchResults();

  return () => { isMounted = false };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // <-- Tell ESLint to ignore redirect dependency

  return (
    <>
    {redirecting && <RedirectLoader />}
    <Background/>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        {/* Page Container */}
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            My Exam Results
          </h1>

          {/* Loading */}
         {loading && results.length === 0 && (
          <div className="flex justify-center items-center mt-20">
            <Loader />
          </div>
        )}
          {/* Empty State */}
          {!loading && results.length === 0 && (
            <div className="bg-white p-10 rounded-2xl shadow text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                No Results Yet
              </h2>
              <p className="text-gray-500">
                You haven't attempted any exams yet.
              </p>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {results.map((r) => (

              <div
                key={r.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >

                {/* Exam Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {r.exam_title || "Unknown Exam"}
                </h2>

                {/* Attempt Date */}
                <p className="text-sm text-gray-500 mb-4">
                  Attempted on:
                  <br />
                  {new Date(r.attempt_date).toLocaleString()}
                </p>

                {/* Exam ID */}
                <p className="text-sm text-gray-600 mb-4">
                  Exam ID: {r.exam_id}
                </p>

                {/* Score Badge */}
                <div className="mt-auto">

                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 rounded-xl font-semibold text-lg shadow">
                    Score: {r.score}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>
  );
}

export default MyResults;