import { useState } from "react";
import type { Job } from "../types/job";
import JobItem from "./JobItem";
import { fetchJobs } from "../api/fetchJobs";

export default function JobSearch() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const result = await fetchJobs(query);
      setJobs(result);
    } catch {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobItem item={job} key={job.job_title + job.employer_name} />
        ))}
      </div>
    </div>
  );
}
