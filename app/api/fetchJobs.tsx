import { Job } from "../types/job";

export async function fetchJobs(query: string): Promise<Job[]> {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=1&num_pages=1`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "313f650458msh860da829fe051bbp1c9ccbjsnf34ee6510282",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    throw error;
  }
}
