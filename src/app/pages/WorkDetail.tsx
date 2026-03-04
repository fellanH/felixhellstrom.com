import { useParams, Link } from "react-router";
import { PageHead } from "../components/PageHead";
import { caseStudies } from "../content/work";
import { caseDetails } from "../content/work-details";
import { NotFoundPage } from "./NotFound";
import { WorkDetailLayout } from "../components/sections/WorkDetailLayout";

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((c) => c.slug === slug);
  const details = slug ? caseDetails[slug] : undefined;

  if (!study || !slug) {
    return <NotFoundPage />;
  }

  const videoSrc = details?.video || study.video;

  return (
    <>
      <PageHead
        title={study.title}
        description={study.description}
        url={`/work/${study.slug}`}
      />
      <WorkDetailLayout study={study} details={details} videoSrc={videoSrc} />
    </>
  );
}
