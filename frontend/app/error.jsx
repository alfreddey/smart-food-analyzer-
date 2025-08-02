'use client';

export default function RouteError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-screen">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-gray-600">
        {error.message || "Unexpected error fetching your nutrition data."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
