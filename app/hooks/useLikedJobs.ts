"use client";

import { useEffect, useState } from "react";
import { Job } from "../types/job";

export function useLikedJobs() {
  const [likedJobs, setLikedJobs] = useState<Job[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("likedJobs");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("likedJobs");
    if (saved) setLikedJobs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
  }, [likedJobs]);

  function toggleLike(job: Job) {
    setLikedJobs((prev) => {
      const isLiked = prev.some((j) => j.job_id === job.job_id);
      if (isLiked) {
        return prev.filter((j) => j.job_id !== job.job_id);
      } else {
        return [...prev, job];
      }
    });
  }

  function isJobLiked(id: string) {
    return likedJobs.some((j) => j.job_id === id);
  }

  return { likedJobs, toggleLike, isJobLiked };
}