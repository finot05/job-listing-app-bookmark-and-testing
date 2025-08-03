'use client';

import { useGetBookmarksQuery } from '@/services/apiServices';
import { useGetJobsQuery } from '@/services/jobsApi';
import JobCard from '@/components/JobCard';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function JobList() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const router = useRouter();

  const { data: jobsData, error, isLoading } = useGetJobsQuery();
  const { data: bookmarksData, refetch: refetchBookmarks } = useGetBookmarksQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (bookmarksData?.data) {
      setBookmarkedIds(new Set(bookmarksData.data.map((b: any) => b.jobId)));
    }
  }, [bookmarksData]);

  const handleBookmarkToggle = (jobId: string, isBookmarkedNow: boolean) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (isBookmarkedNow) newSet.add(jobId);
      else newSet.delete(jobId);
      return newSet;
    });
  };

  const jobs =
    jobsData?.data?.map((job: any) => ({
      ...job,
      isBookmarked: bookmarkedIds.has(job.id),
    })) ?? [];

  return (
    <>
      <div className="flex justify-end items-center h-16 bg-gray-100 p-6 gap-4">
        <button
          onClick={() => router.push('/bookmarks')}
          className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition"
        >
          Bookmarks
        </button>
        <button
          onClick={() =>
            isLoggedIn ? signOut({ callbackUrl: '/jobs' }) : signIn()
          }
          className={`px-4 py-2 rounded-md text-white transition ${
            isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>

      <div className="mx-auto pt-10" style={{ maxWidth: '919px' }}>
        <div className="flex justify-between items-end mb-10 px-5">
          <div>
            <h1 className="font-bold text-3xl text-gray-900">Opportunities</h1>
            <p className="text-sm text-gray-500">Showing {jobs.length} results</p>
          </div>
        </div>

        <div className="space-y-7 px-5">
          {isLoading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
          {error && <p className="text-sm text-red-500 text-center">Failed to load jobs</p>}
          {!isLoading &&
            !error &&
            jobs.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
        </div>
      </div>
    </>
  );
}
