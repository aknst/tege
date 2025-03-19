import { Card } from "@/components/ui/card";
import { SegmentSubjectLink } from "@/schemas/segment-schema";

type SegmentSubjectCardProps = {
  subject: SegmentSubjectLink;
};

const SegmentSubjectCard: React.FC<SegmentSubjectCardProps> = ({ subject }) => {
  const cardContent = (
    <div className="p-4 relative h-full flex justify-between items-center">
      <h3 className="text-lg font-semibold">{subject.name}</h3>
    </div>
  );

  return (
    <Card
      key={subject.slug}
      className="flex flex-col flex-shrink basis-96 flex-grow w-full hover:shadow-lg transition-shadow">
      {cardContent}
    </Card>
  );
};

export default SegmentSubjectCard;
