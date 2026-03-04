import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
}

export function PageHead({
  title,
  description,
  url,
  image,
  type = "website",
  publishedTime,
  jsonLd,
}: PageHeadProps) {
  const fullTitle =
    title === "Home"
      ? "Felix Hellström | Full-Stack Developer & AI Toolmaker"
      : `${title} | Felix Hellström`;

  const twitterCard = image ? "summary_large_image" : "summary";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Felix Hellström" />
      {url && (
        <meta property="og:url" content={`https://felixhellstrom.com${url}`} />
      )}
      {url && (
        <link rel="canonical" href={`https://felixhellstrom.com${url}`} />
      )}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}
      <meta name="twitter:card" content={twitterCard} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
