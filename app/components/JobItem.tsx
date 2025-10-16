import Link from "next/link";
import { Heart } from "lucide-react";
import { Job } from "../types/job";

export default function JobItem({
  item,
  toggleLike,
  isJobLiked,
}: {
  item: Job;
  toggleLike: (job: Job) => void;
  isJobLiked: (id: string) => boolean;
}) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition relative">
      <Link href={`/job-details/${item.job_id}`}>
        <h2 className="font-semibold text-lg">{item.job_title}</h2>
      </Link>
      <button
        onClick={() => toggleLike(item)}
        className="absolute top-3 right-3"
        aria-label="like job"
      >
        <Heart
          size={22}
          className={
            isJobLiked(item.job_id)
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }
        />
      </button>
      <p className="text-gray-600">{item.employer_name}</p>
      <p className="text-sm text-gray-500">
        {item.job_city}, {item.job_country}
      </p>
      <p className="text-xs text-gray-400">
        Posted: {new Date(item.job_posted_at_datetime_utc).toLocaleDateString()}
      </p>
    </div>
  );
}
