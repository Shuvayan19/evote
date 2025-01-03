import { z } from "zod";

export const ElectionSchema = z.object({
  ElectionName: z.string().max(20).optional(),
  Noc: z
    .number()
    .min(2, { message: "atleast 2 candidates required to contest election" })
    .max(8, { message: "at max 8 candidate allowed" }),
  Candidate: z.array(
    z.object({
      CandidateName: z
        .string()
        .min(1, { message: "Candidate name is required" }),
      party_img: z.string().url().optional(),
    })
  ),
  Duration: z.number().min(2).max(1440),
  parentId: z.string().min(1, { message: "Parent Id is required" }),
  isStrict: z.boolean().optional(),
});
