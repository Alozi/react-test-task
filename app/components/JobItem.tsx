import { Job } from "../types/job";

export default function JobItem({ item }: { item: Job }) {
  console.log(item);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{item.job_title}</h2>
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
