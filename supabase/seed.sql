-- Seed data for projects
-- IMPORTANT: Upload your images to a Supabase Storage bucket named 'projects' 
-- and replace the placeholder URLs below with your actual Public URLs.

insert into projects (title, slug, description, tags, github_url, thumbnail_url, pinned, published, created_at) values
(
  'GAN Model from Scratch',
  'gan-model-from-scratch',
  'A DCGAN model built from scratch following the conventional architecture, trained on MNIST data.',
  array['Python', 'PyTorch', 'Jupyter Notebooks', 'Deep Learning'],
  'https://github.com/SiddharthBayapureddy/GAN_from_Scratch',
  'https://wsafaesoqaeitbwbpqjs.supabase.co/storage/v1/object/public/projects/gan_from_scratch.png',
  true,
  true,
  '2024-01-01 10:00:00+00'
),
(
  'Live-MART',
  'live-mart',
  'An E-Commerce website streamlining supply chain for Customers, Retailers and Wholesalers.',
  array['Python', 'FastAPI', 'SQLite', 'HTML/CSS'],
  'https://github.com/SiddharthBayapureddy/Live-MART',
  'https://wsafaesoqaeitbwbpqjs.supabase.co/storage/v1/object/public/projects/livemart.png',
  true,
  true,
  '2024-01-02 10:00:00+00'
),
(
  'Molte — Personal Chatbot',
  'molte-personal-chatbot',
  'A multi-persona chatbot with conversation history tracking, and minimal chatbot UI. Check out several different personas available.',
  array['Python', 'LangChain', 'Grok', 'Streamlit'],
  'https://github.com/SiddharthBayapureddy/Molte',
  'https://wsafaesoqaeitbwbpqjs.supabase.co/storage/v1/object/public/projects/molte.png',
  true,
  true,
  '2024-01-03 10:00:00+00'
),
(
  'Squirl',
  'squirl',
  'A simple, quick website to Shorten URLs and generate QR Codes instantly',
  array['Python', 'Flask'],
  'https://github.com/SiddharthBayapureddy/Squirl',
  'https://wsafaesoqaeitbwbpqjs.supabase.co/storage/v1/object/public/projects/squirl.png',
  false,
  true,
  '2024-01-04 10:00:00+00'
),
(
  'Repo Profiler',
  'repo-profiler',
  'A web app to summarize public GitHub Repos, dependencies and Health reports, along with an AI assisted summary',
  array['Python', 'FastAPI', 'GitHub API', 'Gemini'],
  'https://github.com/SiddharthBayapureddy/repo-profiler',
  'https://wsafaesoqaeitbwbpqjs.supabase.co/storage/v1/object/public/projects/repoprofiler.png',
  false,
  true,
  '2024-01-05 10:00:00+00'
);
