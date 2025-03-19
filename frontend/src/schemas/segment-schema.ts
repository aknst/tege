import { z } from "zod";
import { pbIdSchema } from "./pb-schema";

export const segmentSchema = z.object({
  id: pbIdSchema,
  name: z.string().optional(),
});

export const segmentSubjectLinkSchema = z.object({
  id: pbIdSchema,
  subjectId: pbIdSchema,
  segmentId: pbIdSchema,
  name: z.string().optional(),
  slug: z.string().optional(),
});

export type Segment = z.infer<typeof segmentSchema>;

export const segmentsListSchema = z.array(segmentSchema);
export type SegmentSubjectLink = z.infer<typeof segmentSubjectLinkSchema>;
