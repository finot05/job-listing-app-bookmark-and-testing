import { options } from "@/app/api/auth/[...nextauth]/authOptions";
import JobDetailClient from "@/components/JobDetailContent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: Props) {
  let session = null;

  try {
    session = await getServerSession(options);
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  if (!session) {
    console.warn("No session found. Redirecting to login...");
    redirect("/api/auth/signin"); // or "/login" if you customized
  }

  return <JobDetailClient jobId={params.id} />;
}
