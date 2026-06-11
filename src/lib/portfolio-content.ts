import type { Project } from "@/lib/types";

export const ABOUT = {
  name: "Siddharth Bayapureddy",
  title: "Building AI systems that actually work — not just demos.",
  bio: "I'm Siddharth, a third-year Computer Science student at BITS Pilani, Hyderabad Campus. I spend most of my time building AI/ML systems end-to-end — from training models to deploying them in real infrastructure. My work lives at the intersection of ML engineering and systems thinking. I care about the full pipeline: not just whether a model learns something interesting, but whether it can detect drift, retrain itself, fail gracefully, and explain what's happening in plain English.",
  resumePath: "/resume.pdf",
  profileImage: "/profile.png",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "vigil",
    title: "Vigil — Autonomous MLOps Pipeline",
    slug: "vigil",
    description: "An end-to-end MLOps system built on AWS Free Tier that monitors a predictive maintenance model in production. Vigil watches for feature drift using PSI and KS tests across 21 sensor features, triggers automated retraining when thresholds are breached, and uses a 5-Lambda Step Functions state machine to orchestrate the whole thing. A champion/challenger promotion mechanism ensures only better models go live.",
    long_description: null,
    tags: ["AWS (Lambda, S3, SageMaker)", "XGBoost", "Python", "GitHub Actions"],
    github_url: "https://github.com/SiddharthBayapureddy/Vigil",
    live_url: null,
    thumbnail_url: null,
    pinned: true,
    published: true,
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "silo",
    title: "Silo — Enterprise RAG with Hierarchical RBAC",
    slug: "silo",
    description: "A production-grade knowledge chatbot where access control isn't bolted on — it's enforced at the vector database payload filter layer. Different users see different answers to the same question, based on their role. Silo also blocks PII leakage via Presidio, defends against prompt injection, and runs RAGAS evaluation in CI/CD so quality regressions surface before they hit users.",
    long_description: null,
    tags: ["LangChain", "Qdrant", "Groq/Llama 3", "FastAPI", "Presidio", "Docker"],
    github_url: "https://github.com/SiddharthBayapureddy/Silo",
    live_url: null,
    thumbnail_url: null,
    pinned: true,
    published: true,
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "faultsense",
    title: "FaultSense — Multi-Agent Predictive Maintenance",
    slug: "faultsense",
    description: "A multi-agent system studying how context drift cascades and conflicts across agents in a predictive maintenance pipeline. Four LangGraph nodes — signal processor, RUL predictor, RAG retriever, report writer — collaborate on NASA CMAPSS turbofan data.",
    long_description: null,
    tags: ["LangGraph", "Mistral API", "ChromaDB", "PyTorch LSTM", "FastAPI"],
    github_url: "https://github.com/SiddharthBayapureddy/FaultSense",
    live_url: null,
    thumbnail_url: null,
    pinned: true,
    published: true,
    order_index: 3,
    created_at: new Date().toISOString(),
  }
];
