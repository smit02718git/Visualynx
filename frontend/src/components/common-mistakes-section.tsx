import React from "react";
import type { ConceptMistakesData } from "@/types/mistakes";

interface CommonMistakesProps {
  data: ConceptMistakesData;
}

export default function CommonMistakesSection({
  data,
}: CommonMistakesProps) {
  if (!data || !data.mistakes?.length) return null;

  return (
    <div className="ms-auto p-6 space-y-6 text-slate-800 font-sans">
      {/* Header & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Know the mistakes before you make them.
        </h1>
        <p className="text-slate-500 mt-1 text-base">
          Common misconceptions students encounter with {data.concept.toLowerCase()}.
        </p>
      </div>

      {/* Mistakes Card Stack */}
      <div className="space-y-6">
        {data.mistakes.map((mistake, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-3xl border border-slate-100 shadow-md space-y-4"
          >
            {/* Mistake Title */}
            <h2
              className="text-xl font-bold text-slate-900 leading-snug"
              dangerouslySetInnerHTML={{ __html: mistake.mistake_title }}
            />

            {/* Common Mistake Description */}
            <div className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-700">The Mistake: </span>
              <span
                dangerouslySetInnerHTML={{ __html: mistake.common_mistake }}
              />
            </div>

            {/* Why Students Make This Mistake */}
            <div className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-700">
                Why students make this mistake:{" "}
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: mistake.why_students_make_it }}
              />
            </div>

            {/* Correct Understanding */}
            <div className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-700">
                Correct understanding:{" "}
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: mistake.correct_understanding,
                }}
              />
            </div>

            {/* How to Avoid */}
            <div className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-700">
                How to avoid:{" "}
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: mistake.how_to_avoid }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}