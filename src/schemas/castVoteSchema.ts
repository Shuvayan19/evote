import { z } from "zod";

export const castVoteSchema = z.object({
  VoterId: z.string().min(1, "Voter ID is required"),
  ElectionId: z.string().min(1, "Election ID is required"),
  CandidateId: z.string().min(1, "Candidate ID is required"),
});
