import React from "react";
import type { ConceptFormulasData } from "@/types/formulas";

// TypeScript interfaces matching your Python Pydantic models
interface FormulaCardProps {
    data: ConceptFormulasData;
}

export default function FormulaSection({ data }: FormulaCardProps) {
    if (!data || !data.formulas?.length) return null;

    return (
        <div className="ms-auto space-y-6 p-6 text-slate-800 font-sans zoom-[0.9]">
            {/* Main Section Heading & Subtitle */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Essential Formulas
                </h1>
                <p className="text-slate-500 mt-1 text-base">
                    The equations that describe {data.concept.toLowerCase()}.
                </p>
            </div>

            {/* Formula Cards Stack */}
            <div className="space-y-6">
                {data.formulas.map((formula, index) => {
                    // Format variables if passed as array or string
                    const formattedVariables = Array.isArray(formula.variables)
                        ? formula.variables.join(", ")
                        : formula.variables;

                    // Format units if passed as array or string
                    const formattedUnits = Array.isArray(formula.units)
                        ? formula.units.join(", ")
                        : formula.units;

                    return (
                        <div
                            key={index}
                            className="p-8 bg-white rounded-3xl border border-slate-100 shadow-md space-y-4"
                        >
                            {/* Formula Name */}
                            <h2
                                className="text-xl font-bold text-slate-900"
                                dangerouslySetInnerHTML={{ __html: formula.formula_name }}
                            />

                            {/* Main Formula Text */}
                            <div
                                className="text-2xl font-bold text-blue-600 tracking-wide py-1"
                                dangerouslySetInnerHTML={{ __html: formula.main_formula }}
                            />

                            {/* Key-Value Pairs List */}
                            <div className="space-y-3 pt-2 text-sm text-slate-600">
                                <div className="grid grid-cols-[130px_1fr] items-start">
                                    <span className="font-semibold text-slate-700">Variables:</span>
                                    <span
                                        className="text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: formattedVariables }}
                                    />
                                </div>

                                {/* Units */}
                                <div className="grid grid-cols-[130px_1fr] items-start">
                                    <span className="font-semibold text-slate-700">Units:</span>
                                    <span
                                        className="text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: formattedUnits }}
                                    />
                                </div>

                                {/* When to use */}
                                <div className="grid grid-cols-[130px_1fr] items-start">
                                    <span className="font-semibold text-slate-700">When to use:</span>
                                    <span
                                        className="text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: formula.when_to_use }}
                                    />
                                </div>

                                {/* Common mistake */}
                                <div className="grid grid-cols-[130px_1fr] items-start">
                                    <span className="font-semibold text-slate-700">
                                        Common mistake:
                                    </span>
                                    <span
                                        className="text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: formula.common_mistake }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}