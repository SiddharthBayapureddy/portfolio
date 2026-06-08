export const ABOUT = {
  name: "Siddharth Bayapureddy",
  title:
    "Sophomore in Computer Science Major at BITS Pilani, Hyderabad",
  bio: "My name is Siddharth. I'm currently studying (B.E Computer Science) at BITS Pilani, Hyderabad. I am passionate about AI, ML and development. I try to find real-world problems, and code my way through it :)",
  resumePath: "/resume.pdf",
  profileImage: "/profile.png",
} as const;

export const SKILLS = [
  "Python",
  "Deep Learning",
  "PyTorch",
  "Generative AI",
  "Flask",
  "FastAPI",
  "JavaScript",
  "SQL",
] as const;

export const QUOTE = {
  text: "The best way to predict the future is to invent it.",
  author: "Alan Kay",
} as const;

export const EXPERIENCES = [
  {
    role: "Student",
    company: "BITS Pilani, Hyderabad Campus",
    duration: "2024 — Present",
    description:
      "CS Major, pursuing B.E Computer Science with 9.1 CGPA",
    link: "https://www.bits-pilani.ac.in/hyderabad/",
  },
  {
    role: "Member — Generative AI",
    company: "ACM BPHC",
    duration: "Sep 2025 — Present",
    description:
      "Collaborating with team members, working on projects involving Deep Learning, Generative AI etc.",
    link: "https://acmbphc.in/",
  },
  {
    role: "Member — Machine Learning",
    company: "ACM BPHC",
    duration: "Sep 2025 — Present",
    description:
      "Collaborating with peers on projects in Machine Learning, Deep Learning and OpenCV",
    link: "https://acmbphc.in/",
  },
] as const;

export const PROJECTS = [
  {
    title: "GAN Model from Scratch",
    slug: "gan-model-from-scratch",
    description:
      "A DCGAN model built from scratch following the conventional architecture, trained on MNIST data.",
    tags: ["Python", "PyTorch", "Jupyter Notebooks", "Deep Learning"],
    github_url: "https://github.com/SiddharthBayapureddy/GAN_from_Scratch",
    thumbnail_url: "/projects/gan_from_scratch.png",
    pinned: true,
  },
  {
    title: "Live-MART",
    slug: "live-mart",
    description:
      "An E-Commerce website streamlining supply chain for Customers, Retailers and Wholesalers.",
    tags: ["Python", "FastAPI", "SQLite", "HTML/CSS"],
    github_url: "https://github.com/SiddharthBayapureddy/Live-MART",
    thumbnail_url: "/projects/livemart.png",
    pinned: true,
  },
  {
    title: "Molte — Personal Chatbot",
    slug: "molte-personal-chatbot",
    description:
      "A multi-persona chatbot with conversation history tracking, and minimal chatbot UI. Check out several different personas available.",
    tags: ["Python", "LangChain", "Grok", "Streamlit"],
    github_url: "https://github.com/SiddharthBayapureddy/Molte",
    thumbnail_url: "/projects/molte.png",
    pinned: true,
  },
  {
    title: "Squirl",
    slug: "squirl",
    description:
      "A simple, quick website to Shorten URLs and generate QR Codes instantly",
    tags: ["Python", "Flask"],
    github_url: "https://github.com/SiddharthBayapureddy/Squirl",
    thumbnail_url: "/projects/squirl.png",
    pinned: false,
  },
  {
    title: "Repo Profiler",
    slug: "repo-profiler",
    description:
      "A web app to summarize public GitHub Repos, dependencies and Health reports, along with an AI assisted summary",
    tags: ["Python", "FastAPI", "GitHub API", "Gemini"],
    github_url: "https://github.com/SiddharthBayapureddy/repo-profiler",
    thumbnail_url: "/projects/repoprofiler.png",
    pinned: false,
  },
] as const;
