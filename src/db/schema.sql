-- SQLite schema for felixhellstrom.com dynamic content
-- Run:
--   sqlite3 src/content.db < src/db/schema.sql

PRAGMA foreign_keys = ON;

-- Blog posts ---------------------------------------------------------------

CREATE TABLE posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  date         TEXT NOT NULL,
  description  TEXT NOT NULL,
  category     TEXT NOT NULL,
  body_mdx     TEXT,         -- optional: raw MDX content
  created_at   TEXT DEFAULT (datetime('now')),
  updated_at   TEXT DEFAULT (datetime('now'))
);

CREATE TABLE post_tags (
  post_id  INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag      TEXT NOT NULL,
  PRIMARY KEY (post_id, tag)
);

-- Case studies / work -----------------------------------------------------

CREATE TABLE case_studies (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  client       TEXT NOT NULL,
  description  TEXT NOT NULL,
  year         TEXT NOT NULL,
  featured     INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
  image        TEXT,
  video        TEXT,
  url          TEXT,
  hide_image   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT DEFAULT (datetime('now')),
  updated_at   TEXT DEFAULT (datetime('now'))
);

CREATE TABLE case_study_tags (
  case_study_id  INTEGER NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  tag            TEXT NOT NULL,
  PRIMARY KEY (case_study_id, tag)
);

-- Work detail hero overrides (image/video per case study) -----------------

CREATE TABLE work_details (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  case_study_id  INTEGER NOT NULL UNIQUE REFERENCES case_studies(id) ON DELETE CASCADE,
  image          TEXT,
  video          TEXT
);

-- Projects ----------------------------------------------------------------

CREATE TABLE projects (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  status       TEXT NOT NULL, -- "active" | "building" | "concept"
  url          TEXT,
  github       TEXT,
  npm          TEXT,
  stats        TEXT,
  created_at   TEXT DEFAULT (datetime('now')),
  updated_at   TEXT DEFAULT (datetime('now'))
);

CREATE TABLE project_tags (
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag        TEXT NOT NULL,
  PRIMARY KEY (project_id, tag)
);

-- Testimonials ------------------------------------------------------------

CREATE TABLE testimonials (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL,
  relationship  TEXT NOT NULL, -- "client" | "colleague" | "designer"
  quote         TEXT NOT NULL,
  image         TEXT,
  linkedin      TEXT
);

-- Curated feed items ------------------------------------------------------

CREATE TABLE feed_items (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  position        INTEGER NOT NULL UNIQUE, -- ordering on homepage feed
  type            TEXT NOT NULL,          -- "statement" | "case-study" | "recommendation" | "blog-post" | "project" | "stat"
  -- References for typed items:
  case_study_id   INTEGER REFERENCES case_studies(id) ON DELETE SET NULL,
  testimonial_id  INTEGER REFERENCES testimonials(id) ON DELETE SET NULL,
  post_id         INTEGER REFERENCES posts(id) ON DELETE SET NULL,
  project_id      INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  -- Inline fields for generic/statement/stat items:
  text            TEXT,
  label           TEXT,
  value           TEXT,
  detail          TEXT
);
