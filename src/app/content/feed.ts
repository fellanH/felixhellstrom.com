import type { CaseStudy } from "./work";
import type { Testimonial } from "./testimonials";
import type { Post } from "./posts";
import type { Project } from "./projects";

import { caseStudies } from "./work";
import { testimonials } from "./testimonials";
import { posts } from "./posts";
import { projects } from "./projects";

// --- Feed item types ---

export type FeedItem =
  | { type: "statement"; text: string; label?: string }
  | { type: "case-study"; data: CaseStudy }
  | { type: "recommendation"; data: Testimonial }
  | { type: "blog-post"; data: Post }
  | { type: "project"; data: Project }
  | { type: "stat"; value: string; label: string; detail?: string };

// --- Helpers to look up by slug ---

function work(slug: string): CaseStudy {
  const found = caseStudies.find((c) => c.slug === slug);
  if (!found) throw new Error(`Case study not found: "${slug}"`);
  return found;
}
function rec(name: string): Testimonial {
  const found = testimonials.find((t) => t.name === name);
  if (!found) throw new Error(`Testimonial not found: "${name}"`);
  return found;
}
function post(slug: string): Post {
  const found = posts.find((p) => p.slug === slug);
  if (!found) throw new Error(`Post not found: "${slug}"`);
  return found;
}
function project(slug: string): Project {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Project not found: "${slug}"`);
  return found;
}

// --- Curated feed order ---
// This is the editorial sequence. Mix content types to keep it engaging.

export const feed: FeedItem[] = [
  // 1. Latest blog post (the attention grabber)
  { type: "blog-post", data: post("eleven-prs-while-i-slept") },

  // 2. Featured project
  { type: "case-study", data: work("neonode-hubspot-migration") },

  // 3. Social proof
  { type: "recommendation", data: rec("Mitch Davey") },

  // 4. Key product
  { type: "project", data: project("context-vault") },

  // 5. Visual case study
  { type: "case-study", data: work("gasometer-visual-experience") },

  // 6. Stat break
  {
    type: "stat",
    value: "100+",
    label: "Client projects shipped",
    detail: "Webflow, HubSpot CMS, Next.js, custom builds",
  },

  // 7. Another recommendation
  { type: "recommendation", data: rec("Colin Simpson") },

  // 8. AI blog post
  { type: "blog-post", data: post("building-ai-memory-layer") },

  // 9. Premium case study
  { type: "case-study", data: work("hasselbacken-luxury-hotel") },

  // 10. Designer perspective
  { type: "recommendation", data: rec("Tesceline Tabilas") },

  // 11. Product
  { type: "project", data: project("omni") },

  // 12. Case study
  { type: "case-study", data: work("porsche-club-sweden") },

  // 13. Stat
  {
    type: "stat",
    value: "693+",
    label: "Tests in context-vault",
    detail: "npm published, local-first SQLite + embeddings",
  },

  // 14. Recommendation
  { type: "recommendation", data: rec("Johanna Appelgren") },

  // 15. Webflow blog post
  { type: "blog-post", data: post("webflow-advice-for-beginners") },

  // 16. More work
  { type: "case-study", data: work("salty-decoupled-mapbox") },

  // 17. Final recommendation
  { type: "recommendation", data: rec("Jed Mosely") },
];
