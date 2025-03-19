import { Suspense, useState } from "react";
import { SkeletonSubjectCards, SkeletonTabs } from "../skeleton/skeleton";
import useSubjects from "@/hooks/use-segments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link } from "@tanstack/react-router";
import SubjectCard from "./subjects/subject-card";
import { SegmentSubjectLink } from "@/schemas/segment-schema";

export default function SegmentsTabs({
  getSubjectLink,
}: {
  getSubjectLink?: (subject: SegmentSubjectLink) => string;
}) {
  return (
    <Suspense fallback={<SkeletonTabs />}>
      <SegmentsTabsContent getSubjectLink={getSubjectLink} />
    </Suspense>
  );
}

function SegmentsTabsContent({
  getSubjectLink,
}: {
  getSubjectLink?: (subject: SegmentSubjectLink) => string;
}) {
  const { useAllSegments } = useSubjects();
  const { data: segments } = useAllSegments();

  const [activeSegmentId, setActiveSegmentId] = useState<string>(
    segments[0]?.id
  );

  return (
    <Tabs value={activeSegmentId} onValueChange={setActiveSegmentId}>
      <TabsList>
        {segments.map((segment) => (
          <TabsTrigger key={segment.id} value={segment.id} className="md:w-56">
            {segment.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {segments.map((segment) => (
        <TabsContent key={segment.id} value={segment.id}>
          {activeSegmentId === segment.id && (
            <Suspense fallback={<SkeletonSubjectCards />}>
              <SubjectsList
                segmentId={segment.id}
                getSubjectLink={getSubjectLink}
              />
            </Suspense>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function SubjectsList({
  segmentId,
  getSubjectLink,
}: {
  segmentId: string;
  getSubjectLink?: (subject: SegmentSubjectLink) => string;
}) {
  const { useSegmentSubjects } = useSubjects();
  const { data: subjects } = useSegmentSubjects(segmentId);

  return (
    <div className="flex gap-2 flex-wrap">
      {subjects.length > 0 ? (
        subjects.map((subject) => {
          const link = getSubjectLink ? getSubjectLink(subject) : null;
          return link ? (
            <Link key={subject.slug} to={link} className="basis-96 flex-grow">
              <SubjectCard subject={subject} />
            </Link>
          ) : (
            <SubjectCard key={subject.slug} subject={subject} />
          );
        })
      ) : (
        <p className="text-muted-foreground">Нет доступных предметов.</p>
      )}
    </div>
  );
}
