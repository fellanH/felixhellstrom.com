## The challenge

Neonode needed to move their entire web presence — 37 pages, 135 press releases, and 5 content groups — from Contentful to HubSpot CMS. The content spanned multiple CDN origins (Cision and Contentful), with complex asset references that couldn't simply be copy-pasted across platforms.

I had zero HubSpot CMS experience when the project started in December 2025.

## What I built

An idempotent migration pipeline in Node.js that maps Contentful's content model to HubSpot modules, resolves multi-CDN asset URLs, and handles incremental re-runs without duplicating content. The pipeline processes press releases with their associated metadata, images, and cross-references in a single pass.

I learned HubSpot CMS architecture, HubL templating, and the HubSpot APIs on the job — shipping the first production pages within two weeks of starting.

> "Felix quickly became proficient in HubSpot CMS and delivered a complex migration pipeline that handled our entire content library. His ability to ramp up on new technology while maintaining delivery quality is impressive."
> — Stefan Soneus, Neonode

## Key details

- **37 pages** migrated with full content fidelity
- **135 press releases** with Cision CDN asset resolution
- **Idempotent pipeline** — safe to re-run without duplicates
- **Zero downtime** cutover from Contentful to HubSpot
