import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  url?: string;
}

export function PageHead({ title, description, url }: PageHeadProps) {
  const fullTitle = `${title} — Felix Hellström`;
  const canonicalUrl = url
    ? `https://felixhellstrom.com${url}`
    : "https://felixhellstrom.com";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
