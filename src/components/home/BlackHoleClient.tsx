"use client";

import dynamic from "next/dynamic";

const BlackHole = dynamic(() => import("./BlackHole"), { ssr: false });

export function BlackHoleClient() {
  return <BlackHole />;
}
