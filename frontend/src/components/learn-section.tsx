import React from "react";
import type { ConceptExplanationData } from "@/types/explaination";

interface ConceptCardProps {
  data: ConceptExplanationData;
}

export default function ConceptCard({ data }: ConceptCardProps) {
  if (!data) return null;

  return (
    // Used `w-1/2` as requested, and `ms-auto` (margin-start: auto) to push it to the right
    <div className="w-1/2 ms-auto p-6 text-zinc-900 border border-zinc-200 rounded-2xl shadow-md">
      {/* Question Header */}
      <div className="mb-6 border-b border-zinc-100 pb-4">
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
          Concept Breakdown
        </span>
        <h2 className="text-2xl font-bold text-zinc-900 leading-snug">
          {data.question}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Definition */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
            Definition
          </h3>
          <p className="text-base text-zinc-700 leading-relaxed font-medium">
            {data.definition}
          </p>
        </div>

        {/* Core Idea */}
        <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Core Idea
          </h3>
          <p className="text-md text-zinc-800 leading-relaxed">
            {data.core_idea}
          </p>
        </div>

        {/* Intuition */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
            Intuition & Mental Model
          </h3>
          <p className="text-md text-zinc-600 leading-relaxed">
            {data.intuition}
          </p>
        </div>

        {/* Think About It */}
        <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/60">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">💡</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Think About It
            </h3>
          </div>
          <p className="text-md text-amber-900 leading-relaxed">
            {data.think_about_it}
          </p>
        </div>
      </div>
    </div>
  );
}