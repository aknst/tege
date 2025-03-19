import {
  segmentsListSchema,
  SegmentSubjectLink,
} from "@/schemas/segment-schema";
import { pb } from "./pocketbase";
import { queryOptions } from "@tanstack/react-query";

export async function getAllSegments() {
  const segments = await pb.collection("segments").getFullList();
  return segmentsListSchema.parse(segments);
}

export async function getSegmentSubjects(segmentId: string) {
  const segmentSubjects = await pb
    .collection<SegmentSubjectLink>("segmentSubjectLinks")
    .getFullList({
      filter: `segment="${segmentId}"`,
    });
  return segmentSubjects;
}

export async function getSegmentSubjectBySlug(segmentSubjectSlug: string) {
  const segmentSubject = await pb
    .collection("segmentSubjectLinks")
    .getFirstListItem(`slug="${segmentSubjectSlug}"`);

  return segmentSubject;
}

export const segmentsQueryOptions = queryOptions({
  queryKey: ["segments"],
  queryFn: () => getAllSegments(),
  staleTime: 30 * 1000,
  gcTime: 5 * 60 * 1000,
  refetchInterval: 5 * 60 * 1000,
});

export const segmentSubjectsQueryOptions = (segmentId: string) =>
  queryOptions({
    queryKey: ["segmentSubjects", segmentId],
    queryFn: () => getSegmentSubjects(segmentId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

export const segmentSubjectBySlugQueryOptions = (segmentSubjectSlug: string) =>
  queryOptions({
    queryKey: ["segmentSubject", segmentSubjectSlug],
    queryFn: () => getSegmentSubjectBySlug(segmentSubjectSlug),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
