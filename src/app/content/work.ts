export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  image?: string;
  video?: string;
  url?: string;
  hideImage?: boolean;
}

export const caseStudies: CaseStudy[] = [
  // --- Featured (order matters for homepage) ---
  {
    slug: "neonode-hubspot-migration",
    title: "Contentful to HubSpot CMS Migration",
    client: "Neonode",
    description:
      "Designed an idempotent migration pipeline for 37 pages, 135 press releases, and 5 content groups. Multi-CDN asset handling across Cision and Contentful origins. Learned HubSpot CMS from zero.",
    tags: ["HubSpot CMS", "Contentful", "Migration", "Node.js"],
    year: "2026",
    featured: true,
    image: "/images/work/neonode.jpg",
    hideImage: true,
    url: "https://neonode.com",
  },
  {
    slug: "hasselbacken-luxury-hotel",
    title: "Luxury Hotel Website Rebuild",
    client: "Hasselbacken",
    description:
      "Rebuilt the website for one of Sweden's most famous hotels. Full Webflow build with booking integrations, restaurant pages, and event spaces. Video hero, multi-language support.",
    tags: ["Webflow", "Hospitality", "Booking Integration"],
    year: "2024",
    featured: true,
    image: "/images/work/hasselbacken.avif",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1042528420/rendition/720p/file.mp4?loc=external&log_user=0&signature=01b7e5c0a23629125054c76f3226937af0fb8c59a4f23f0448fa8335d09215c7",
    url: "https://www.hasselbacken.com/",
  },
  {
    slug: "gasometer-visual-experience",
    title: "Gasometer Visual Experience",
    client: "Cirkus Venues",
    description:
      "Built a visual experience site for a 1,740-seat theater venue in central Stockholm. Dark, cinematic design with immersive scroll-driven animations.",
    tags: ["Webflow", "Animation", "Visual Design"],
    year: "2023",
    featured: true,
    image: "/images/work/gasometer.avif",
    url: "https://www.gasometer.se/",
  },
  {
    slug: "porsche-club-sweden",
    title: "Mobile-First Membership Platform",
    client: "Porsche Club Sweden",
    description:
      "Transformed the club's outdated website into a sleek, mobile-first experience for 6,000+ members. Modern architecture embodying passion and community.",
    tags: ["Webflow", "Mobile-First", "CMS"],
    year: "2025",
    featured: true,
    image: "/images/work/porsche-club.webp",
    video:
      "https://r2.vidzflow.com/source/7ddb99e5-d475-4928-90b5-099b38b4a9ca.mp4",
    url: "https://www.porsche.nu/",
  },
  // --- Other projects ---
  {
    slug: "salty-decoupled-mapbox",
    title: "Decoupled Mapbox + AWS Architecture",
    client: "Salty.co",
    description:
      "Designed a decoupled beach mapping platform combining Webflow CMS with Mapbox GL JS and AWS Lambda for weather data caching. Authored full architectural proposal with 3-phase roadmap.",
    tags: ["Webflow", "Mapbox GL JS", "AWS Lambda", "Vercel"],
    year: "2025",
    image: "/images/work/salty.jpg",
    url: "https://salty.co",
  },
  {
    slug: "miramis-enterprise-hub",
    title: "Enterprise Hub with Custom Integrations",
    client: "Miramis / Qarlbo AB",
    description:
      "Custom Instagram integration, InRecruit JSON job integration, dynamic scaling, fluid responsive system, and preloader. Full styleguide delivery.",
    tags: ["Webflow", "API Integration", "Custom Code"],
    year: "2024",
    image: "/images/work/miramis.avif",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1032460293/rendition/2160p/file.mp4?loc=external&log_user=0&signature=37118ffc1f99e1a93bb90062c90644372c6d0a72aea74572a3f50651a9e0167c",
    url: "https://www.miramis.com/",
  },
  {
    slug: "resident-interface-launch",
    title: "Full Site Build & Launch in 4 Weeks",
    client: "Resident Interface",
    description:
      "End-to-end site build for US client, from proposal negotiation to launch in under a month. Comprehensive SEO deployment with massive organic traffic improvements post-launch.",
    tags: ["Webflow CMS", "GTM", "GA4", "Technical SEO"],
    year: "2025",
    url: "https://residentinterface.com",
  },
  {
    slug: "luna-diabetes",
    title: "Medical Device Website",
    client: "Luna Diabetes",
    description:
      "Ongoing partnership building and maintaining the website for Luna Diabetes, an automated insulin delivery company. Webflow CMS with compliance-ready content structure.",
    tags: ["Webflow", "Healthcare", "CMS"],
    year: "2024",
    image: "/images/work/luna-diabetes.avif",
    url: "https://www.lunadiabetes.com/",
  },
  {
    slug: "rol-group",
    title: "Strategic Digital Consolidation",
    client: "ROL Group",
    description:
      "Led UX/UI design and Webflow development, transforming ROL Group's digital presence into a seamless and engaging experience across global operations.",
    tags: ["Webflow", "UX/UI", "Corporate"],
    year: "2022",
    image: "/images/work/rol-group.jpg",
    video: "https://cdn.vidzflow.com/v/qjQSxskb6T_1080p_1709900589.mp4",
    url: "https://www.rolgroup.com/",
  },
  {
    slug: "precis-digital",
    title: "Corporate Website",
    client: "Precis Digital",
    description:
      "Built the website for Precis, a major Swedish player in digital marketing, bringing together media, creative, tech, data and analytics into one cohesive offering.",
    tags: ["Webflow", "Corporate", "CMS"],
    year: "2025",
    image: "/images/work/precis.jpg",
    url: "https://www.precis.com",
  },
  {
    slug: "we-know-aeo",
    title: "We Know AEO: AI Engine Optimization",
    client: "Internal",
    description:
      "Built a Next.js site exploring AI Engine Optimization, the practice of structuring web content for AI search engines like ChatGPT, Perplexity, and Claude. Full schema markup and semantic HTML.",
    tags: ["Next.js", "AEO", "SEO", "Schema.org"],
    year: "2025",
    url: "https://www.weknowaeo.com/",
  },
  {
    slug: "ai-product-discovery",
    title: "AI Product Discovery Platform",
    client: "Skafos LLC",
    description:
      "Built the web presence for the world's first AI product discovery platform. Full site rebuild with about 15 pages in just over a month.",
    tags: ["Webflow", "AI", "E-commerce"],
    year: "2021",
  },
  {
    slug: "stockholm-business-apartments",
    title: "Online Booking Site & Brand Identity",
    client: "Stockholm Business Apartments",
    description:
      "Created a complete online booking site and brand identity for a hospitality company in central Stockholm.",
    tags: ["Webflow", "Booking", "Brand Identity"],
    year: "2018",
    url: "https://ettsmart.se/",
  },
];
