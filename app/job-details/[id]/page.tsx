import { fetchJobDetails } from "@/app/api/fetchJobDetails";
import { JobDetailsPageProps } from "@/app/types/jobDetails";

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await fetchJobDetails(params.id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
        Job not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
      <p className="text-lg text-gray-700 mb-2">{job.employer_name}</p>
      <p className="text-gray-500 mb-4">
        {job.job_city}, {job.job_country}
      </p>

      {job.employer_website && (
        <a
          href={job.employer_website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Visit employer website →
        </a>
      )}

      <div className="border-t border-gray-200 pt-4">
        <h2 className="font-semibold text-xl mb-2">Job Description</h2>
        <p className="text-gray-600 whitespace-pre-line">
          {job.job_description || "No description available."}
        </p>
      </div>

      {job.job_apply_link && (
        <a
          href={job.job_apply_link}
          target="_blank"
          className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      )}
    </div>
  );
}
