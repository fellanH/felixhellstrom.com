import { PageHead } from "../components/PageHead";
import { WorkCaseStudyGrid } from "../components/sections/WorkCaseStudyGrid";

export function WorkPage() {
  return (
    <>
      <PageHead
        title="Work"
        description="Selected client projects and case studies by Felix Hellström."
        url="/work"
      />
      <WorkCaseStudyGrid />
    </>
  );
}
