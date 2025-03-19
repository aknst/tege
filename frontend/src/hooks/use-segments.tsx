import {
  segmentsQueryOptions,
  segmentSubjectBySlugQueryOptions,
  segmentSubjectsQueryOptions,
} from "@/services/api-segments";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSubjects() {
  const useAllSegments = () => {
    return useSuspenseQuery(segmentsQueryOptions);
  };

  const useSegmentSubjects = (segmentId: string) => {
    return useSuspenseQuery(segmentSubjectsQueryOptions(segmentId));
  };

  const useSegmentSubjectBySlug = (segmentSubjectSlug: string) => {
    return useSuspenseQuery(
      segmentSubjectBySlugQueryOptions(segmentSubjectSlug)
    );
  };

  return {
    useAllSegments,
    useSegmentSubjects,
    useSegmentSubjectBySlug,
  };
}
