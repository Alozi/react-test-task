"use client";

import JobItem from "../components/JobItem";
import { useLikedJobs } from "../hooks/useLikedJobs";

export default function LikedJobsPage() {
  const { likedJobs, toggleLike, isJobLiked } = useLikedJobs();

  if (likedJobs.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">No liked jobs yet.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">❤️ Liked Jobs</h1>
      <div className="grid gap-4">
        {likedJobs.map((job) => (
          <JobItem
            item={job}
            key={job.job_id}
            toggleLike={toggleLike}
            isJobLiked={isJobLiked}
          />
        ))}
      </div>
    </div>
  );
}
