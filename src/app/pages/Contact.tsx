import { PageHead } from "../components/PageHead";
import { ContactMethodsSection } from "../components/sections/ContactMethods";

export function ContactPage() {
  return (
    <>
      <PageHead
        title="Contact"
        description="Get in touch with Felix Hellström. Open to Webflow projects, AI integrations, and interesting collaborations."
        url="/contact"
      />
      <ContactMethodsSection />
    </>
  );
}
