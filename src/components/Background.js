function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200"></div>

      {/* Floating Blob 1 */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>

      {/* Floating Blob 2 */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Floating Blob 3 */}
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[100px] font-bold text-gray-800 opacity-5 select-none">
            LEARN • TEST • IMPROVE
        </h1>
      </div>

    </div>
  );
}

export default Background;