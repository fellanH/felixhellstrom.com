PRAGMA foreign_keys = ON;

-- Clear existing data (for re-running the seed safely)
DELETE FROM feed_items;
DELETE FROM work_details;
DELETE FROM case_study_tags;
DELETE FROM case_studies;
DELETE FROM post_tags;
DELETE FROM posts;
DELETE FROM project_tags;
DELETE FROM projects;
DELETE FROM testimonials;

-- Posts -------------------------------------------------------------------

INSERT INTO posts (slug, title, date, description, category) VALUES
('omni-agent-orchestrator',
 'Inside omni, My Autonomous Agent Orchestrator',
 '2026-03-06',
 'How I built omni, a 3-layer agent system that opens GitHub issues, runs Claude Code agents, and merged 11 PRs while I slept.',
 'AI Workflows'),
('eleven-prs-while-i-slept',
 '11 PRs While I Slept',
 '2026-03-05',
 'I let an autonomous agent orchestrator run overnight for the first time. 686 cycles, 11 merged PRs, and a lot of lessons about what breaks when no one is watching.',
 'AI Workflows'),
('building-ai-memory-layer',
 'Building an AI Memory Layer with Context Vault',
 '2026-03-04',
 'How I built a persistent memory system for Claude Code that survives across sessions, and why local-first matters.',
 'Products'),
('building-self-improving-agent-os',
 'Building a Self-Improving Agent OS',
 '2026-03-03',
 'How I built a personal operating system where AI agents log their own friction and write their own backlog. The system improves itself as you use it.',
 'Building in Public'),
('using-git-with-ai-agents',
 'Using Git with AI Agents in Cursor',
 '2025-09-25',
 'A practical workflow for integrating Git into AI coding sessions. Branches, atomic commits, and intent-driven messages.',
 'AI Workflows'),
('webflow-advice-for-beginners',
 'After 8 Years of Webflow, Here''s My Advice for Beginners',
 '2025-02-25',
 'Three crucial things I wish someone had told me when I first started with Webflow: Relume, Client-First, and REM units.',
 'Webflow')
;

INSERT INTO post_tags (post_id, tag)
VALUES
((SELECT id FROM posts WHERE slug = 'building-ai-memory-layer'), 'ai'),
((SELECT id FROM posts WHERE slug = 'building-ai-memory-layer'), 'claude-code'),
((SELECT id FROM posts WHERE slug = 'building-ai-memory-layer'), 'context-vault'),
((SELECT id FROM posts WHERE slug = 'building-ai-memory-layer'), 'mcp'),
((SELECT id FROM posts WHERE slug = 'building-self-improving-agent-os'), 'ai-agents'),
((SELECT id FROM posts WHERE slug = 'building-self-improving-agent-os'), 'automation'),
((SELECT id FROM posts WHERE slug = 'building-self-improving-agent-os'), 'mcp'),
((SELECT id FROM posts WHERE slug = 'building-self-improving-agent-os'), 'omni'),
((SELECT id FROM posts WHERE slug = 'eleven-prs-while-i-slept'), 'ai-agents'),
((SELECT id FROM posts WHERE slug = 'eleven-prs-while-i-slept'), 'automation'),
((SELECT id FROM posts WHERE slug = 'eleven-prs-while-i-slept'), 'claude-code'),
((SELECT id FROM posts WHERE slug = 'eleven-prs-while-i-slept'), 'omni-cli'),
((SELECT id FROM posts WHERE slug = 'omni-agent-orchestrator'), 'ai-agents'),
((SELECT id FROM posts WHERE slug = 'omni-agent-orchestrator'), 'automation'),
((SELECT id FROM posts WHERE slug = 'omni-agent-orchestrator'), 'omni'),
((SELECT id FROM posts WHERE slug = 'omni-agent-orchestrator'), 'workflow'),
((SELECT id FROM posts WHERE slug = 'using-git-with-ai-agents'), 'ai-agents'),
((SELECT id FROM posts WHERE slug = 'using-git-with-ai-agents'), 'cursor'),
((SELECT id FROM posts WHERE slug = 'using-git-with-ai-agents'), 'git'),
((SELECT id FROM posts WHERE slug = 'using-git-with-ai-agents'), 'workflow'),
((SELECT id FROM posts WHERE slug = 'webflow-advice-for-beginners'), 'client-first'),
((SELECT id FROM posts WHERE slug = 'webflow-advice-for-beginners'), 'rem'),
((SELECT id FROM posts WHERE slug = 'webflow-advice-for-beginners'), 'tips'),
((SELECT id FROM posts WHERE slug = 'webflow-advice-for-beginners'), 'webflow')
;

-- Case studies (work) -----------------------------------------------------

INSERT INTO case_studies (slug, title, client, description, year, featured, image, video, url, hide_image) VALUES
('neonode-hubspot-migration',
 'Contentful to HubSpot CMS Migration',
 'Neonode',
 'Designed an idempotent migration pipeline for 37 pages, 135 press releases, and 5 content groups. Multi-CDN asset handling across Cision and Contentful origins. Learned HubSpot CMS from zero.',
 '2026', 1, '/images/work/neonode.webp', NULL, 'https://neonode.com', 1),
('precis-digital',
 'Corporate Website',
 'Precis Digital',
 'Built the website for Precis, a major Swedish player in digital marketing, bringing together media, creative, tech, data and analytics into one cohesive offering.',
 '2025', 0, '/images/work/precis.jpg', NULL, 'https://www.precis.com', 0),
('salty-decoupled-mapbox',
 'Decoupled Mapbox + AWS Architecture',
 'Salty.co',
 'Designed a decoupled beach mapping platform combining Webflow CMS with Mapbox GL JS and AWS Lambda for weather data caching. Authored full architectural proposal with 3-phase roadmap.',
 '2025', 0, '/images/work/salty.jpg', NULL, 'https://salty.co', 0),
('resident-interface-launch',
 'Full Site Build & Launch in 4 Weeks',
 'Resident Interface',
 'End-to-end site build for US client, from proposal negotiation to launch in under a month. Comprehensive SEO deployment with massive organic traffic improvements post-launch.',
 '2025', 0, NULL, NULL, 'https://residentinterface.com', 0),
('porsche-club-sweden',
 'Porsche Club Sweden Membership Platform',
 'Porsche Club Sweden',
 'We transformed Porsche Club Sweden''s outdated website into a sleek, mobile-first experience that embodies passion, community, and modern architecture — delighting 6,000+ members.',
 '2025', 1, '/images/work/porsche-club.webp', 'https://r2.vidzflow.com/source/7ddb99e5-d475-4928-90b5-099b38b4a9ca.mp4', 'https://www.porsche.nu/', 0),
('we-know-aeo',
 'We Know AEO: AI Engine Optimization',
 'Internal',
 'Built a Next.js site exploring AI Engine Optimization, the practice of structuring web content for AI search engines like ChatGPT, Perplexity, and Claude. Full schema markup and semantic HTML.',
 '2025', 0, NULL, NULL, 'https://www.weknowaeo.com/', 0),
('miramis-enterprise-hub',
 'Enterprise Hub with Custom Integrations',
 'Miramis / Qarlbo AB',
 'Custom Instagram integration, InRecruit JSON job integration, dynamic scaling, fluid responsive system, and preloader. Full styleguide delivery.',
 '2024', 0, '/images/work/miramis.avif', 'https://player.vimeo.com/progressive_redirect/playback/1032460293/rendition/2160p/file.mp4?loc=external&log_user=0&signature=37118ffc1f99e1a93bb90062c90644372c6d0a72aea74572a3f50651a9e0167c', 'https://www.miramis.com/', 0),
('hasselbacken-luxury-hotel',
 'Hasselbacken Luxury Hotel Website Rebuild',
 'Hasselbacken',
 'Rebuilt the website for one of Sweden''s most famous hotels. Full Webflow build with booking integrations, restaurant pages, and event spaces. Video hero, multi-language support.',
 '2024', 1, '/images/work/hasselbacken.avif', 'https://r2.vidzflow.com/source/10e3c722-0575-4afb-b308-f5227eb8fb91.mp4', 'https://www.hasselbacken.com/', 0),
('luna-diabetes',
 'Medical Device Website',
 'Luna Diabetes',
 'Ongoing partnership building and maintaining the website for Luna Diabetes, an automated insulin delivery company. Webflow CMS with compliance-ready content structure.',
 '2024', 0, '/images/work/luna-diabetes.avif', NULL, 'https://www.lunadiabetes.com/', 0),
('gasometer-visual-experience',
 'Gasometer Visual Experience',
 'Cirkus Venues',
 'Built a visual experience site for a 1,740-seat theater venue in central Stockholm. Dark, cinematic design with immersive scroll-driven animations.',
 '2023', 1, '/images/work/gasometer.avif', NULL, 'https://www.gasometer.se/', 0),
('rol-group',
 'Strategic Digital Consolidation',
 'ROL Group',
 'Led UX/UI design and Webflow development, transforming ROL Group''s digital presence into a seamless and engaging experience across global operations.',
 '2022', 0, '/images/work/rol-group.jpg', 'https://cdn.vidzflow.com/v/qjQSxskb6T_1080p_1709900589.mp4', 'https://www.rolgroup.com/', 0)
;

INSERT INTO case_study_tags (case_study_id, tag)
SELECT id, tag FROM (
  SELECT (SELECT id FROM case_studies WHERE slug = 'gasometer-visual-experience') AS id, 'Animation' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'gasometer-visual-experience') AS id, 'Visual Design' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'gasometer-visual-experience') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'hasselbacken-luxury-hotel') AS id, 'Booking Integration' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'hasselbacken-luxury-hotel') AS id, 'Hospitality' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'hasselbacken-luxury-hotel') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'luna-diabetes') AS id, 'CMS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'luna-diabetes') AS id, 'Healthcare' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'luna-diabetes') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'miramis-enterprise-hub') AS id, 'API Integration' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'miramis-enterprise-hub') AS id, 'Custom Code' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'miramis-enterprise-hub') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration') AS id, 'Contentful' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration') AS id, 'HubSpot CMS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration') AS id, 'Migration' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration') AS id, 'Node.js' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'porsche-club-sweden') AS id, 'CMS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'porsche-club-sweden') AS id, 'Mobile-First' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'porsche-club-sweden') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'precis-digital') AS id, 'CMS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'precis-digital') AS id, 'Corporate' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'precis-digital') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'resident-interface-launch') AS id, 'GA4' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'resident-interface-launch') AS id, 'GTM' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'resident-interface-launch') AS id, 'Technical SEO' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'resident-interface-launch') AS id, 'Webflow CMS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'rol-group') AS id, 'Corporate' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'rol-group') AS id, 'UX/UI' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'rol-group') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'salty-decoupled-mapbox') AS id, 'AWS Lambda' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'salty-decoupled-mapbox') AS id, 'Mapbox GL JS' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'salty-decoupled-mapbox') AS id, 'Vercel' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'salty-decoupled-mapbox') AS id, 'Webflow' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'we-know-aeo') AS id, 'AEO' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'we-know-aeo') AS id, 'Next.js' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'we-know-aeo') AS id, 'SEO' AS tag UNION ALL
  SELECT (SELECT id FROM case_studies WHERE slug = 'we-know-aeo') AS id, 'Schema.org' AS tag
);

-- Work details (work-details.ts) -----------------------------------------

INSERT INTO work_details (case_study_id, image, video)
VALUES
((SELECT id FROM case_studies WHERE slug = 'gasometer-visual-experience'), '/images/work/gasometer.avif', NULL),
((SELECT id FROM case_studies WHERE slug = 'hasselbacken-luxury-hotel'), '/images/work/hasselbacken.avif', 'https://r2.vidzflow.com/source/10e3c722-0575-4afb-b308-f5227eb8fb91.mp4'),
((SELECT id FROM case_studies WHERE slug = 'luna-diabetes'), '/images/work/luna-diabetes.avif', NULL),
((SELECT id FROM case_studies WHERE slug = 'miramis-enterprise-hub'), '/images/work/miramis.avif', 'https://player.vimeo.com/progressive_redirect/playback/1032460293/rendition/2160p/file.mp4?loc=external&log_user=0&signature=37118ffc1f99e1a93bb90062c90644372c6d0a72aea74572a3f50651a9e0167c'),
((SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration'), NULL, NULL),
((SELECT id FROM case_studies WHERE slug = 'porsche-club-sweden'), '/images/work/porsche-club.webp', 'https://r2.vidzflow.com/source/7ddb99e5-d475-4928-90b5-099b38b4a9ca.mp4'),
((SELECT id FROM case_studies WHERE slug = 'rol-group'), '/images/work/rol-group.jpg', 'https://cdn.vidzflow.com/v/qjQSxskb6T_1080p_1709900589.mp4')
;

-- Projects ----------------------------------------------------------------

INSERT INTO projects (slug, title, description, status, url, github, npm, stats) VALUES
('we-know-aeo',
 'We Know AEO',
 'Research site exploring AI Engine Optimization. How to structure content so AI search engines (ChatGPT, Perplexity, Claude) surface your brand. Full Schema.org markup.',
 'active',
 'https://weknowaeo.com',
 NULL,
 NULL,
 NULL),
('context-vault',
 'context-vault',
 'Persistent memory for AI agents. Local-first MCP server that gives Claude Code and other AI tools a semantic memory layer that survives across sessions. Published on npm, 693+ tests, full SaaS ecosystem.',
 'active',
 'https://context-vault.com',
 'https://github.com/fellanH/context-vault',
 'https://www.npmjs.com/package/context-vault',
 '693+ tests, npm published, SaaS + self-hosted'),
('omni',
 'omni-cli',
 'Autonomous agent orchestrator. 3-layer system (master, workspace, project) that dispatches Claude Code agents to implement GitHub issues end-to-end. First overnight run: 686 cycles, 11 PRs merged, 8 self-healed stalls.',
 'active',
 '/blog/omni-agent-orchestrator/',
 NULL,
 NULL,
 '6,700+ lines, 11 PRs merged overnight'),
('origin',
 'origin',
 'Keyboard-driven split-panel desktop workspace. Tauri 2 app with hot-reload plugins, canvas layouts, and a motion system. Rust backend, React frontend.',
 'building',
 NULL,
 'https://github.com/fellanH/origin',
 NULL,
 NULL),
('trained-on',
 'trained-on.com',
 'Self-serve platform for e-commerce store owners to generate professional product photography with custom-trained AI models. Stripe billing, Supabase auth, FAL.ai inference.',
 'building',
 NULL,
 NULL,
 NULL,
 NULL)
;

INSERT INTO project_tags (project_id, tag)
SELECT id, tag FROM (
  SELECT (SELECT id FROM projects WHERE slug = 'context-vault') AS id, 'Claude Code' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'context-vault') AS id, 'Embeddings' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'context-vault') AS id, 'MCP' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'context-vault') AS id, 'SQLite' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'context-vault') AS id, 'TypeScript' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'omni') AS id, 'Automation' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'omni') AS id, 'Claude Code' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'omni') AS id, 'GitHub API' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'omni') AS id, 'TypeScript' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'origin') AS id, 'React' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'origin') AS id, 'Rust' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'origin') AS id, 'Tauri' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'origin') AS id, 'TypeScript' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'trained-on') AS id, 'AI' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'trained-on') AS id, 'FAL.ai' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'trained-on') AS id, 'Next.js' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'trained-on') AS id, 'Stripe' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'trained-on') AS id, 'Supabase' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'we-know-aeo') AS id, 'AEO' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'we-know-aeo') AS id, 'Next.js' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'we-know-aeo') AS id, 'SEO' AS tag UNION ALL
  SELECT (SELECT id FROM projects WHERE slug = 'we-know-aeo') AS id, 'Schema.org' AS tag
);

-- Testimonials ------------------------------------------------------------

INSERT INTO testimonials (name, role, relationship, quote, image, linkedin) VALUES
('Mitch Davey',
 'Colleague at Stormfors',
 'colleague',
 'Felix is a true Webflow wizard whose endless curiosity and dedication to his craft are truly inspiring. Much of what I know about Webflow, I learned by following his example. Felix was one of the OG members of Stormfors when I joined, and I saw first-hand how his expertise and innovative approach significantly shaped the direction of the company. His ability to tackle complex projects and deliver outstanding results consistently makes him an invaluable asset to any team.',
 '/images/people/mitch-davey.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Colin Simpson',
 'Founder & CEO',
 'client',
 'Felix is a brilliant digital designer and developer. He understands his domain extremely well and constantly offers up his valuable perspective and solutions. I''ve thoroughly enjoyed working with him, especially because of his great communication style and attention to detail. You can tell he really loves what he does and it shows. I''d highly recommend Felix!',
 '/images/people/colin-simpson.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Johanna Appelgren',
 'Head of Marketing',
 'client',
 'I had the pleasure of working with Felix on improving our company website and I couldn''t be more impressed with his skills as a web developer. Felix is not only highly knowledgeable, but also a true professional who takes pride in his work. He was always available to address any concerns and provided creative solutions that helped take our website to the next level.',
 '/images/people/johanna-appelgren.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Jed Mosely',
 'Founder & CEO',
 'client',
 'Felix was great to work with in building out our website true to our original intent. He''s likable and reliable. He didn''t back down from some technical challenges along the way. He''s a great blend of the professional and personable. Felix helped us understand our options and built and executed a plan that met our goals.',
 '/images/people/jed-mosely.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Tesceline Tabilas',
 'Client',
 'client',
 'It was wonderful to partner with a web developer who has appreciation and respect for design. Two of Felix''s qualities that stood out to me were his understanding of the client''s needs and business and his ability to enhance meeting productivity by guiding conversation. I am impressed by his technical skills and grateful for his openness to share his knowledge.',
 '/images/people/tesceline-tabilas.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Mikael Brunnberg',
 'Colleague at Stormfors',
 'colleague',
 'Felix is one of the most productive and fast colleagues I have had the opportunity to work together with. He''s very creative and technically skilled in Webflow/web development and up to date with the modern tools. He''s fun, positive and super easy to collaborate with. A pleasure!',
 '/images/people/mikael-brunnberg.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Lisbeth Langhorn',
 'Head of Marketing',
 'client',
 'I can certainly recommend Felix to anyone seeking a Webflow professional who can elevate their digital presence. He possesses the skills, creativity, and dedication needed to bring your vision to life. I am confident that his contributions will significantly enhance any project fortunate enough to have him on board.',
 '/images/people/lisbeth-langhorn.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Frank Bagge',
 'Senior Consultant at Narva',
 'client',
 'Incredibly grateful for the swift and outstanding delivery of a one-page solution for one of our valued customers at Narva! The efficiency, attention to detail, and seamless execution made all the difference. Truly a job well done!',
 '/images/people/frank-bagge.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/'),
('Jacob Schultz',
 'Senior Designer',
 'designer',
 'Working alongside Felix was an absolute delight. His technical expertise and commitment were evident throughout the entire process. Felix has my warmest recommendation.',
 '/images/people/jacob-schultz.avif',
 'https://www.linkedin.com/in/felixhellstrom/details/recommendations/')
;

-- Feed items --------------------------------------------------------------

INSERT INTO feed_items (position, type, post_id)
VALUES (1, 'blog-post', (SELECT id FROM posts WHERE slug = 'eleven-prs-while-i-slept'));

INSERT INTO feed_items (position, type, project_id)
VALUES (2, 'project', (SELECT id FROM projects WHERE slug = 'context-vault'));

INSERT INTO feed_items (position, type, post_id)
VALUES (3, 'blog-post', (SELECT id FROM posts WHERE slug = 'building-ai-memory-layer'));

INSERT INTO feed_items (position, type, case_study_id)
VALUES (4, 'case-study', (SELECT id FROM case_studies WHERE slug = 'neonode-hubspot-migration'));

INSERT INTO feed_items (position, type, testimonial_id)
VALUES (5, 'recommendation', (SELECT id FROM testimonials WHERE name = 'Mitch Davey'));

INSERT INTO feed_items (position, type, value, label, detail)
VALUES (6, 'stat', '100+', 'Client projects shipped', 'Webflow, HubSpot CMS, Next.js, custom builds');

INSERT INTO feed_items (position, type, post_id)
VALUES (7, 'blog-post', (SELECT id FROM posts WHERE slug = 'webflow-advice-for-beginners'));

INSERT INTO feed_items (position, type, case_study_id)
VALUES (8, 'case-study', (SELECT id FROM case_studies WHERE slug = 'porsche-club-sweden'));

INSERT INTO feed_items (position, type, case_study_id)
VALUES (9, 'case-study', (SELECT id FROM case_studies WHERE slug = 'gasometer-visual-experience'));

INSERT INTO feed_items (position, type, testimonial_id)
VALUES (10, 'recommendation', (SELECT id FROM testimonials WHERE name = 'Colin Simpson'));

INSERT INTO feed_items (position, type, project_id)
VALUES (11, 'project', (SELECT id FROM projects WHERE slug = 'omni'));

INSERT INTO feed_items (position, type, case_study_id)
VALUES (12, 'case-study', (SELECT id FROM case_studies WHERE slug = 'salty-decoupled-mapbox'));

INSERT INTO feed_items (position, type, value, label, detail)
VALUES (13, 'stat', '693+', 'Tests in context-vault', 'npm published, local-first SQLite + embeddings');

INSERT INTO feed_items (position, type, testimonial_id)
VALUES (14, 'recommendation', (SELECT id FROM testimonials WHERE name = 'Johanna Appelgren'));

INSERT INTO feed_items (position, type, testimonial_id)
VALUES (15, 'recommendation', (SELECT id FROM testimonials WHERE name = 'Tesceline Tabilas'));

INSERT INTO feed_items (position, type, case_study_id)
VALUES (16, 'case-study', (SELECT id FROM case_studies WHERE slug = 'hasselbacken-luxury-hotel'));

INSERT INTO feed_items (position, type, testimonial_id)
VALUES (17, 'recommendation', (SELECT id FROM testimonials WHERE name = 'Jed Mosely'));
