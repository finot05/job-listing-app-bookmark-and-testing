'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../types/types';
import BookmarkButton from './Bookmark';

type Props = {
  job: Job;
  index: number;
  onBookmarkToggle?: (jobId: string, isBookmarkedNow: boolean) => void;
};

export default function JobCard({ job, index, onBookmarkToggle }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/job/${job.id}`);
  };

  return (
    <div
    data-testid="job-card"
      onClick={handleClick}
      className="relative hover:shadow-md hover:bg-blue-50 cursor-pointer border border-gray-200 rounded-2xl flex flex-row p-5 gap-5 mb-5 transition-all duration-200"
    >
      <BookmarkButton
  eventId={job.id}
  initialBookmarked={job.isBookmarked ?? false}
  onToggle={onBookmarkToggle}
/>

      

      <div className="flex-shrink-0">
        <img
          src={job.logoUrl || `/job${index + 1}.png`}
          alt={`Logo of ${job.orgName}`}
          className="h-12 w-12 object-cover rounded-full bg-white"
        />
      </div>

      <div className="flex-grow">
        <div className="text-lg font-semibold text-gray-900">{job.title || "Untitled Job"}</div>
        <div className="text-sm text-gray-500">
          {job.orgName || ""}
          {job.location.length > 0 && <span className="mx-1">•</span>}
          {job.location[0] || ""}
        </div>
        <div className="text-sm text-gray-700 mt-2 line-clamp-2">{job.description || ""}</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {job.categories[0] && (
            <span className="border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition">
              {job.categories[0]}
            </span>
          )}
          {job.categories[1] && (
            <span className="border-2 border-red-600 text-red-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition">
              {job.categories[1]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
