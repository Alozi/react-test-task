"use client";

import JobSearch from "./components/JobSearch";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <JobSearch />
    </main>
  );
}
