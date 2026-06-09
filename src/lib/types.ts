export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  tags: string[] | null;
  github_url: string | null;
  live_url: string | null;
  thumbnail_url: string | null;
  pinned: boolean;
  published: boolean;
  order_index: number;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string | null;
  skills: string[] | null;
  link: string | null;
  pinned: boolean;
  published: boolean;
  order_index: number;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  order_index: number;
  created_at: string;
};
