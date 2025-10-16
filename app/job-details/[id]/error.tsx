"use client";

export default function JobDetailsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Something went wrong 😔
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn’t load job details. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
