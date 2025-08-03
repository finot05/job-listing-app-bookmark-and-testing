'use client';

import React, { useEffect } from "react";
import JobCard from "@/components/JobCard";
import { useGetBookmarksQuery } from "@/services/apiServices";
import { Job } from "@/types/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BookmarkedJobs = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoggedIn = status === 'authenticated';

  // Only fetch bookmarks if logged in
  const {
    data: bookmarksData,
    error,
    isLoading,
  } = useGetBookmarksQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      toast.error("You must be logged in to view bookmarks.");
      // Optionally redirect to login page OR
      // just show a message and let user login manually
      // router.push("/api/auth/signin");
    }
  }, [error]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">Not Logged In</h2>
        <p className="text-center max-w-md text-base mb-4">
          You need to be logged in to view your bookmarked jobs.
        </p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => router.push("/api/auth/signin")}
        >
          Log In
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="text-3xl font-semibold text-gray-600 animate-pulse mt-20 text-center">
        Loading bookmarked jobs...
      </p>
    );
  }

  const jobs: Job[] = (bookmarksData?.data || []).map((job: any) => ({
    ...job,
    id: job.eventID,
    description: job.description || "",
    categories: job.categories || [],
    location: job.location ? [job.location] : [],
    isBookmarked: true,
    opType: job.opType || "",
    orgName: job.orgName || "",
    logoUrl: job.logoUrl || "",
    title: job.title || "",
  }));

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">No Bookmarked Jobs</h2>
        <p className="text-center max-w-md text-base">
          You haven't bookmarked any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold Maintext text-center mt-10">
        Bookmarked jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
        {jobs.map((job, i) => (
          <JobCard job={job} index={i} key={job.id} />
        ))}
      </div>
    </>
  );
};

export default BookmarkedJobs;
