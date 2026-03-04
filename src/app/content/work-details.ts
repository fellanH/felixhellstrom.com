export interface WorkDetailSection {
  heading?: string;
  content: string[];
  image?: string;
}

export interface WorkDetail {
  image?: string;
  video?: string;
  sections?: WorkDetailSection[];
}

export const caseDetails: Record<string, WorkDetail> = {
  "neonode-hubspot-migration": {
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Neonode had 37 pages and 135 press releases in Contentful that needed to migrate to HubSpot CMS. The content spanned 5 content groups with assets hosted across multiple CDNs (Cision and Contentful).",
          "I picked up HubSpot CMS with zero prior experience and had to design a migration pipeline that could handle the complexity.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I built an idempotent migration pipeline. Each run could be safely re-executed without duplicating content. The pipeline handled multi-CDN asset resolution, mapping Contentful content types to HubSpot modules, and preserving URL structures for SEO continuity.",
          "The idempotent design was critical because the client continued updating content in Contentful during the migration window. I could re-run the pipeline at any point and it would sync only the changes.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "All 37 pages and 135 press releases migrated successfully with zero data loss. The pipeline is reusable for future Contentful-to-HubSpot migrations.",
        ],
      },
    ],
  },
  "gasometer-visual-experience": {
    image: "/images/work/gasometer.avif",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Cirkus Venues' vision for Gasometer is to transform it into a state-of-the-art entertainment venue and a hub for creativity and culture. With its iconic architecture and rich history, it's a unique space that lends itself to a wide range of entertainment: theater, music concerts, live shows, exhibitions, fairs, corporate events, and product launches.",
          "They needed a website that would match the venue's dramatic presence. A 1,740-seat theater in central Stockholm deserves more than a standard corporate page.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I built a dark, cinematic visual experience site that mirrors the atmosphere of the venue itself. Full-screen imagery, ambient animations, and a design language that puts the architecture front and center.",
          "The technical execution included scroll-driven animations, responsive video backgrounds, and a clean CMS structure for event listings and press content.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "A visual experience that does justice to the venue. The site serves as both a marketing tool and an event discovery platform, with booking flows integrated directly into the experience.",
        ],
      },
    ],
  },
  "hasselbacken-luxury-hotel": {
    image: "/images/work/hasselbacken.avif",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1042528420/rendition/720p/file.mp4?loc=external&log_user=0&signature=01b7e5c0a23629125054c76f3226937af0fb8c59a4f23f0448fa8335d09215c7",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Hasselbacken is one of Sweden's most famous hotels, with a history dating back to the 19th century. They needed a website rebuild that would reflect the property's luxury positioning while handling complex booking integrations for rooms, restaurants, and event spaces.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "Full Webflow build with a design system that balances heritage and modernity. The site features video backgrounds, smooth scroll animations, and integrated booking flows for rooms, restaurant tables, and events. Multi-language support for the international audience.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "A premium hotel website that serves both as a booking platform and a brand experience, with clear conversion paths for each of Hasselbacken's revenue streams.",
        ],
      },
    ],
  },
  "porsche-club-sweden": {
    image: "/images/work/porsche-club.webp",
    video:
      "https://r2.vidzflow.com/source/7ddb99e5-d475-4928-90b5-099b38b4a9ca.mp4",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Porsche Club Sweden, with 6,000+ members, had an outdated website that didn't reflect the premium brand or serve mobile users well. They needed a modern platform that could handle member content, event listings, and club communications.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I built a mobile-first Webflow site with a modern architecture that embodies the passion and community of the club. The CMS structure was designed for easy content management by non-technical staff, with member events, news, and partner content all flowing through a structured system.",
        ],
      },
      {
        heading: "The Result",
        content: [
          'A sleek, responsive membership platform that serves the club\'s growing community across all devices. The client said: "The new site perfectly captures the spirit of our club."',
        ],
      },
    ],
  },
  "miramis-enterprise-hub": {
    image: "/images/work/miramis.avif",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1032460293/rendition/2160p/file.mp4?loc=external&log_user=0&signature=37118ffc1f99e1a93bb90062c90644372c6d0a72aea74572a3f50651a9e0167c",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Miramis (Qarlbo AB) needed an enterprise hub with multiple custom integrations: Instagram feed, InRecruit job listings via JSON API, dynamic content scaling, and a fluid responsive system.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I built custom API integrations for both Instagram and InRecruit, a dynamic scaling system for content blocks, a fluid responsive layout, a preloader, and delivered a full styleguide for the design system.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "A fully integrated enterprise hub that pulls in live data from multiple sources and scales cleanly across all screen sizes.",
        ],
        image: "/images/work/miramis.avif",
      },
    ],
  },
  "salty-decoupled-mapbox": {
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Salty needed a way to display interactive beach maps on their Webflow site without coupling the frontend to a heavy backend. The existing approach was brittle and slow to update.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I designed a three-phase architecture. Phase 1: Mapbox GL JS integration reading from Webflow CMS via API. Phase 2: AWS Lambda functions for caching weather data from third-party APIs. Phase 3: Vercel Edge deployment for global performance.",
          "The key insight was treating the map as a standalone micro-frontend that pulls data from Webflow's CMS API at build time, with runtime weather data coming from the Lambda cache layer.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "A fully decoupled system where content editors update beaches in Webflow CMS and the map updates automatically. Weather data stays fresh through the Lambda cache without hammering third-party rate limits.",
        ],
      },
    ],
  },
  "resident-interface-launch": {
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Resident Interface, a US-based company, needed a complete website built and launched in under a month. The scope included full Webflow CMS setup, Google Tag Manager, GA4 analytics, and comprehensive technical SEO.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I handled everything from proposal negotiation through to launch. Built the site in Webflow with a clean CMS architecture, implemented GTM and GA4 tracking, and deployed a full technical SEO setup including structured data, meta tags, sitemaps, and page speed optimization.",
        ],
      },
      {
        heading: "The Result",
        content: [
          "Site launched on time with massive organic traffic improvements post-launch. The comprehensive SEO deployment meant the site started ranking quickly for target keywords.",
        ],
      },
    ],
  },
  "rol-group": {
    image: "/images/work/rol-group.jpg",
    video: "https://cdn.vidzflow.com/v/qjQSxskb6T_1080p_1709900589.mp4",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "ROL Group needed to consolidate their digital presence across global operations into a cohesive, modern website.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "I led the UX/UI design and Webflow development, creating a seamless user experience that works across ROL Group's international markets.",
        ],
      },
      {
        heading: "The Result",
        content: [
          'A transformed digital presence that effectively represents ROL Group\'s global operations. The client said: "Having been on both sides of the agency-client relationship, I know how rare it is to find a developer who truly gets both design and business."',
        ],
      },
    ],
  },
  "luna-diabetes": {
    image: "/images/work/luna-diabetes.avif",
    sections: [
      {
        heading: "The Challenge",
        content: [
          "Luna Diabetes builds automated insulin delivery technology for pen users. They needed a website that communicates complex medical technology in an approachable way, while meeting healthcare content compliance requirements.",
        ],
      },
      {
        heading: "The Approach",
        content: [
          "Built in Webflow with a carefully structured CMS for product pages, team profiles, career listings, and blog content. The design focuses on clarity and trust, essential for a medical device company.",
        ],
      },
      {
        heading: "The Result",
        content: [
          'An ongoing partnership. The client said: "What a team, thanks for pulling it together and making it shine."',
        ],
      },
    ],
  },
  "we-know-aeo": {
    sections: [
      {
        heading: "The Concept",
        content: [
          "AI Engine Optimization (AEO) is the practice of structuring web content so AI search engines (ChatGPT, Perplexity, Claude) can understand and surface it. It's the next evolution of SEO.",
          "I built weknowaeo.com as a research and demonstration site exploring these techniques.",
        ],
      },
      {
        heading: "The Technical Approach",
        content: [
          "Built with Next.js and deployed with comprehensive schema markup. Every page uses structured data (Schema.org) and semantic HTML to maximize machine readability. The site itself is a working example of AEO principles.",
        ],
      },
      {
        heading: "What I Learned",
        content: [
          "The key insight: AI search engines weight structured data, FAQ schemas, and clean semantic HTML much more heavily than traditional SEO signals. Sites that are built for machines first and humans second will dominate the AI search era.",
        ],
      },
    ],
  },
};
