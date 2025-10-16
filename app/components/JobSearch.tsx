import { useState, useEffect } from "react";
import type { Job } from "../types/job";
import JobItem from "./JobItem";
import { fetchJobs } from "../api/fetchJobs";
import { useLikedJobs } from "../hooks/useLikedJobs";
import { Profile } from "../types/profile";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function JobSearch() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { toggleLike, isJobLiked } = useLikedJobs();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => {
    const query = profile?.desiredJobTitle || "";
    if (query) {
      handleSubmit(query);
    }
  }, [profile]);

  async function handleSubmit(query: string) {
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
  }
  return (
    <div className="w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Search</h1>

      <Formik
        initialValues={{ query: profile?.desiredJobTitle || "" }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values.query);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex gap-2 mb-6">
            <Field
              type="text"
              name="query"
              placeholder="Search jobs by title..."
              className="flex-grow border border-gray-300 rounded-lg p-2"
            />
            {errors.query && touched.query ? (
              <div className="text-red-500 text-sm mt-1">{errors.query}</div>
            ) : null}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </Form>
        )}
      </Formik>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4">
        {jobs.map((job) => (
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
