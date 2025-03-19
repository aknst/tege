import { Skeleton } from "../ui/skeleton";

export const SkeletonTabs: React.FC<{ count?: number; className?: string }> = ({
  count = 2,
  className = "w-56 h-7",
}) => (
  <div className="flex gap-2 flex-wrap">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className={className} />
    ))}
  </div>
);

export const SkeletonSubjectCards: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 3, className = "h-32 rounded-lg flex-shrink flex-grow" }) => (
  <div className="flex gap-2 flex-wrap">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className={className} />
    ))}
  </div>
);

export function SkeletonTreeViewFilter() {
  return (
    <div>
      <Skeleton />
    </div>
  );
}
