import SegmentsTabs from "@/components/segments/segments-tabs";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_main/")({
  component: Index,
});

/**
 * Компонент главной страницы.
 *
 * Отображает заголовок и описание для "Банка задач".
 *
 * @component
 * @returns {JSX.Element} Разметка главной страницы.
 */
function Index() {
  return (
    <div className="">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Банк задач
        </h1>
        <p className="text-muted-foreground">Открытый банк ФИПИ</p>
        <SegmentsTabs />
      </div>
    </div>
  );
}
