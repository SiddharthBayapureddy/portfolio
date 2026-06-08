-- Seed data from portfolio_data.json
-- Run after schema.sql

insert into projects (title, slug, description, tags, github_url, thumbnail_url, pinned, published) values
(
  'GAN Model from Scratch',
  'gan-model-from-scratch',
  'A DCGAN model built from scratch following the conventional architecture, trained on MNIST data.',
  array['Python', 'PyTorch', 'Jupyter Notebooks', 'Deep Learning'],
  'https://github.com/SiddharthBayapureddy/GAN_from_Scratch',
  '/projects/gan_from_scratch.png',
  true,
  true
),
(
  'Live-MART',
  'live-mart',
  'An E-Commerce website streamlining supply chain for Customers, Retailers and Wholesalers.',
  array['Python', 'FastAPI', 'SQLite', 'HTML/CSS'],
  'https://github.com/SiddharthBayapureddy/Live-MART',
  '/projects/livemart.png',
  true,
  true
),
(
  'Molte — Personal Chatbot',
  'molte-personal-chatbot',
  'A multi-persona chatbot with conversation history tracking, and minimal chatbot UI. Check out several different personas available.',
  array['Python', 'LangChain', 'Grok', 'Streamlit'],
  'https://github.com/SiddharthBayapureddy/Molte',
  '/projects/molte.png',
  true,
  true
),
(
  'Squirl',
  'squirl',
  'A simple, quick website to Shorten URLs and generate QR Codes instantly',
  array['Python', 'Flask'],
  'https://github.com/SiddharthBayapureddy/Squirl',
  '/projects/squirl.png',
  false,
  true
),
(
  'Repo Profiler',
  'repo-profiler',
  'A web app to summarize public GitHub Repos, dependencies and Health reports, along with an AI assisted summary',
  array['Python', 'FastAPI', 'GitHub API', 'Gemini'],
  'https://github.com/SiddharthBayapureddy/repo-profiler',
  '/projects/repoprofiler.png',
  false,
  true
);
