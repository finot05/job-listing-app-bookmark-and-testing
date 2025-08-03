'use client';

import React, { useEffect } from "react";
import { useGetJobByIdQuery } from '@/services/jobsApi';
import { toast } from 'react-toastify';
import { useSession, signOut } from "next-auth/react";

type Props = {
  jobId: string;
};

export default function JobDetailClient({ jobId }: Props) {
  const { data, error, isLoading } = useGetJobByIdQuery(jobId);
  const job = data?.data;

  const { status } = useSession();

  // Show error toast only once on error change
  useEffect(() => {
    if (error) {
      if ('status' in error && error.status === 401) {
        toast.error("Session expired. Please login again.");
        signOut({ callbackUrl: '/api/auth/signin' });
      } else {
        toast.error("Could not load job details.");
      }
    }
  }, [error]);

  if (isLoading) return <div className="p-5 text-gray-500">Loading...</div>;
  if (error || !job) return <div className="p-5 text-red-500">Error loading job details</div>;

  const colorMap = ["text-[#FFB836]", "text-red-400", "text-green-500"];
  const borderMap = ["border-blue-200", "border-red-200", "border-green-200"];
  const bgMap = ["bg-blue-100", "bg-red-100", "bg-green-100"];

  return (
    <div className="flex justify-center bg-white px-4 py-10 font-poppins text-[17px]">
      <div className="flex gap-16 w-full max-w-[1229px]">
        {/* LEFT MAIN CONTENT */}
        <div className="w-[860px]">
          <h1 className="text-3xl font-extrabold font-epilogue mb-6">{job.title}</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 font-epilogue">Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 font-epilogue">Responsibilities</h2>
            {job.responsibilities?.split("\n").map((item, index) => (
              <div key={index} className="flex items-start gap-2 mb-2">
                <img src="/check.png" alt="Check" className="w-4 h-4 mt-1" />
                <p>{item}</p>
              </div>
            ))}
          </section>

          {job.requirements && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-3 font-epilogue">Requirements</h2>
              {job.requirements.split("\n").map((req, index) => (
                <div key={index} className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p>{req}</p>
                </div>
              ))}
            </section>
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 font-epilogue">Ideal Candidate</h2>
            {job.idealCandidate?.split("\n").map((trait, index) => (
              <div key={index} className="flex gap-2">
                <span className="font-bold">•</span>
                <p>{trait}</p>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 font-epilogue">When & Where</h2>
            <div className="flex gap-3 items-start">
              <img src="/location.png" className="w-11 h-11" alt="Location" />
              <p>{job.whenAndWhere}</p>
            </div>
          </section>

          {job.perksAndBenefits && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-3 font-epilogue">Perks & Benefits</h2>
              <p>{job.perksAndBenefits}</p>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-[320px]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 font-epilogue">About</h2>
            {[
              { label: "Posted On", value: job.datePosted, icon: "/postedon.png" },
              { label: "Deadline", value: job.deadline, icon: "/deadline.png" },
              { label: "Location", value: job.location?.join(", "), icon: "/location.png" },
              { label: "Start Date", value: job.startDate, icon: "/starteddate.png" },
              { label: "End Date", value: job.endDate, icon: "/end.png" },
              { label: "Applicants", value: `${job.applicantsCount}`, icon: "/check.png" },
              { label: "Views", value: `${job.viewsCount}`, icon: "/check.png" },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-center mb-3">
                <img src={item.icon} alt={item.label} className="w-9 h-9" />
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 font-epilogue">Categories</h2>
            {job.categories?.map((cat, index) => (
              <span
                key={index}
                className={`inline-block px-3 py-1 mr-2 mb-2 text-sm rounded-xl font-medium border transition
                ${colorMap[index % 3]} ${bgMap[index % 3]} ${borderMap[index % 3]}`}
              >
                {cat}
              </span>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 font-epilogue">Required Skills</h2>
            {job.requiredSkills?.map((skill, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 mr-2 mb-2 text-sm text-[#4640DE] bg-blue-100 border border-blue-200 rounded hover:bg-[#4640DE] hover:text-white transition"
              >
                {skill}
              </span>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
