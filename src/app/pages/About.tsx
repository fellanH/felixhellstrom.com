import { PageHead } from "../components/PageHead";
import { AboutHeaderSection } from "../components/sections/AboutHeader";
import { AboutBodySection } from "../components/sections/AboutBody";

export function AboutPage() {
  return (
    <>
      <PageHead
        title="About"
        description="Felix Hellström. Full-stack developer and technical lead based in Sweden. 28+ client projects, building AI tools and web platforms."
        url="/about"
      />
      <AboutHeaderSection />
      <AboutBodySection />
    </>
  );
}
