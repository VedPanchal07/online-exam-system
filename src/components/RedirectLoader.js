function RedirectLoader() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        <p className="text-white text-lg font-semibold">Redirecting...</p>
      </div>
    </div>
  );
}

export default RedirectLoader;