import { Job } from "../types/job";

export async function fetchJobDetails(id: string): Promise<Job | null> {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "313f650458msh860da829fe051bbp1c9ccbjsnf34ee6510282",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch job details:", error);
    return null;
  }
}
