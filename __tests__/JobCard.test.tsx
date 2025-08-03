import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import JobCard from "@/components/JobCard";
import { store } from "@/store/store";
import '@testing-library/jest-dom';

const job = {
  id: "1",
  title: "Frontend Developer",
  orgName: "Tech Corp",
  location: ["Remote"],
  description: "Job description",
  isBookmarked: false,
  responsibilities: "Responsibilities",
  requirements: "Requirements",
  idealCandidate: "Ideal Candidate",
  categories: ["Engineering", "Frontend"],
  opType: "Full-time",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  deadline: "2024-12-01",
  requiredSkills: ["React", "TypeScript"],
  whenAndWhere: "Whenever and wherever",
  orgID: "org1",
  datePosted: "2024-08-01",
  status: "Open",
  applicantsCount: 10,
  viewsCount: 200,
  logoUrl: "/logo.png",
  isRolling: false,
  questions: null,
  perksAndBenefits: null,
  createdAt: "2024-08-01",
  updatedAt: "2024-08-01",
  orgPrimaryPhone: "123-456-7890",
  orgEmail: "contact@techcorp.com",
  average_rating: 4.5,
  total_reviews: 20,
};

describe("JobCard", () => {
  it("renders job title and company name", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <JobCard job={job} index={0} />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument();
    expect(screen.getByText((content, element) =>
      content.includes("Remote")
    )).toBeInTheDocument();

    expect(screen.getByText("Job description")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("shows fallback title and skips missing fields gracefully", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <JobCard
            job={{
              id: "empty-job",
              title: "",
              orgName: "",
              location: [],
              description: "",
              isBookmarked: false,
              responsibilities: "",
              requirements: "",
              idealCandidate: "",
              categories: [],
              opType: "",
              startDate: "",
              endDate: "",
              deadline: "",
              requiredSkills: [],
              whenAndWhere: "",
              orgID: "",
              datePosted: "",
              status: "",
              applicantsCount: 0,
              viewsCount: 0,
              logoUrl: "",
              isRolling: false,
              questions: null,
              perksAndBenefits: null,
              createdAt: "",
              updatedAt: "",
              orgPrimaryPhone: "",
              orgEmail: "",
              average_rating: 0,
              total_reviews: 0,
            }}
            index={0}
          />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Untitled Job")).toBeInTheDocument();
    expect(screen.queryByText(/Unknown Org/)).not.toBeInTheDocument();
    expect(screen.queryByText("No description provided.")).not.toBeInTheDocument();
  });
});
