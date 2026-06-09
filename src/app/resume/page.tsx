import { createMetadata } from "@/lib/metadata";
import ResumePageClient from "./ResumePageClient";

export const metadata = createMetadata({
  title: "Resume",
  description: "View or download my professional resume.",
  path: "/resume",
});

export default function ResumePage() {
  return <ResumePageClient />;
}
