"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    CanvasScript,
    MetricState,
    RuntimeState,
    VisualizationConfig,
} from "@/types/visualization";

type VizSandboxProps = {
    config: VisualizationConfig;
};


/**
 * Normalizes JavaScript received from Gemini/API.
 *
 * Supports:
 * 1. Normal multiline JavaScript
 * 2. One-line JavaScript
 * 3. Strings containing literal "\\n"
 * 4. Accidental Markdown code fences
 */
function normalizeScript(script: string): string {
    if (!script) {
        return "";
    }

    let normalized = script.trim();

    // Remove accidental Markdown fences.
    normalized = normalized.replace(/^```(?:javascript|js)?\s*/i, "");
    normalized = normalized.replace(/\s*```$/i, "");

    // Convert literal backslash-n sequences into real newlines.
    normalized = normalized.replace(/\\r\\n/g, "\n");
    normalized = normalized.replace(/\\n/g, "\n");
    normalized = normalized.replace(/\\r/g, "\r");

    return normalized.trim();
}


/**
 * Converts any returned value into a displayable string.
 */
function formatMetricValue(
    value: unknown,
    unit: string
): string {
    if (value === null || value === undefined) {
        return "—";
    }

    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            return "—";
        }

        const formatted = Number.isInteger(value)
            ? value.toString()
            : value.toFixed(2);

        return unit ? `${formatted} ${unit}` : formatted;
    }

    if (typeof value === "boolean") {
        return value ? "YES" : "NO";
    }

    return unit ? `${String(value)} ${unit}` : String(value);
}


export default function VizSandbox({ config }: VizSandboxProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /**
     * Slider values live in a ref so changing a slider
     * does not restart the animation loop.
     */
    const slidersRef = useRef<Record<string, number>>(
        Object.fromEntries(
            config.sliders.map((slider) => [
                slider.id,
                slider.default,
            ])
        )
    );

    /**
     * Persistent visualization state.
     *
     * Examples:
     * runtime.waveTime
     * runtime.simTime
     * runtime.particles
     * runtime.totalCollisions
     */
    const runtimeRef = useRef<RuntimeState>({});

    /**
     * Current calculated metrics.
     */
    const metricsRef = useRef<MetricState>({});

    /**
     * Used only to update the React UI when sliders move.
     */
    const [, forceRender] = useState(0);

    /**
     * Used for displaying metric values without
     * restarting the canvas animation.
     */
    const [, forceMetricRender] = useState(0);

    /**
     * Keep the latest config available to the animation loop.
     */
    const configRef = useRef(config);

    useEffect(() => {
        configRef.current = config;
    }, [config]);


    /**
     * Reset state when a completely new visualization
     * configuration is provided.
     */
    useEffect(() => {
        slidersRef.current = Object.fromEntries(
            config.sliders.map((slider) => [
                slider.id,
                slider.default,
            ])
        );

        runtimeRef.current = {};
        metricsRef.current = {};

        forceRender((value) => value + 1);
        forceMetricRender((value) => value + 1);
    }, [config]);


    /**
     * Update slider value.
     */
    const handleSliderChange = useCallback(
        (id: string, value: number) => {
            slidersRef.current = {
                ...slidersRef.current,
                [id]: value,
            };

            forceRender((current) => current + 1);
        },
        []
    );


    /**
     * Canvas animation engine.
     */
    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        let animationFrameId: number;
        let isRunning = true;

        const normalizedMetricScript = normalizeScript(
            config.metric_script
        );

        const normalizedCanvasScript = normalizeScript(
            config.canvas_script
        );

        type MetricScript = (
            ctx: CanvasRenderingContext2D,
            sliders: Record<string, number>,
            metrics: MetricState,
            runtime: RuntimeState,
        ) => void;

        let metricFunction: MetricScript | null = null;

        let canvasFunction: CanvasScript | null = null;

        /**
         * Compile metric script.
         */
        try {
            if (normalizedMetricScript) {
                metricFunction = new Function(
                    "ctx",
                    "sliders",
                    "metrics",
                    "runtime",
                    normalizedMetricScript,
                ) as MetricScript;
            }
        } catch (error) {
            console.error(
                "Failed to compile metric_script:",
                error
            );
        }


        /**
         * Compile canvas script.
         */
        try {
            if (normalizedCanvasScript) {
                canvasFunction = new Function(
                    "ctx",
                    "sliders",
                    "metrics",
                    "runtime",
                    normalizedCanvasScript
                ) as CanvasScript;
            }
        } catch (error) {
            console.error(
                "Failed to compile canvas_script:",
                error
            );
        }


        /**
         * Render loop.
         */
        const render = () => {
            if (!isRunning) {
                return;
            }

            const sliders = slidersRef.current;
            const metrics = metricsRef.current;
            const runtime = runtimeRef.current;

            /**
             * Always reset canvas state.
             */
            ctx.save();

            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            /**
             * Light canvas background.
             */
            ctx.fillStyle = "#ffffff";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.restore();


            /**
             * Calculate metrics first.
             */
            if (metricFunction) {
                try {
                    metricFunction(
                        ctx,
                        sliders,
                        metrics,
                        runtime
                    );
                } catch (error) {
                    console.error(
                        "Error inside metric_script:",
                        error
                    );
                }
            }


            /**
             * Draw visualization.
             */
            if (canvasFunction) {
                try {
                    canvasFunction(
                        ctx,
                        sliders,
                        metrics,
                        runtime
                    );
                } catch (error) {
                    console.error(
                        "Error inside canvas_script:",
                        error
                    );
                }
            }


            /**
             * Update metric UI periodically.
             *
             * We don't need React to render at 60 FPS.
             */
            if (
                typeof runtime.metricFrame !== "number"
            ) {
                runtime.metricFrame = 0;
            }

            runtime.metricFrame += 1;

            if (runtime.metricFrame % 5 === 0) {
                forceMetricRender(
                    (current) => current + 1
                );
            }


            animationFrameId =
                requestAnimationFrame(render);
        };

        render();

        return () => {
            isRunning = false;

            cancelAnimationFrame(
                animationFrameId
            );
        };
    }, [
        config.canvas_script,
        config.metric_script,
    ]);


    return (
        <div className="flex h-full min-h-0 w-[48%] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">

            {/* ================================================= */}
            {/* MAIN CONTENT                                      */}
            {/* ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-5xl p-4 sm:p-5">

                    {/* ============================================= */}
                    {/* CANVAS                                         */}
                    {/* ============================================= */}

                    <div className="mx-auto w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={320}
                            className="block h-auto max-h-[46vh] w-full object-contain"
                        />
                    </div>


                    {/* ============================================= */}
                    {/* SLIDERS                                        */}
                    {/* ============================================= */}

                    {config.sliders.length > 0 && (
                        <section className="mt-4">
                            <div
                                className={`grid gap-4 ${config.sliders.length === 1
                                    ? "grid-cols-1"
                                    : config.sliders.length === 2
                                        ? "grid-cols-1 md:grid-cols-2"
                                        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                                    }`}
                            >
                                {config.sliders.map(
                                    (slider) => {
                                        const value =
                                            slidersRef.current[
                                            slider.id
                                            ] ?? slider.default;

                                        const isDegree =
                                            slider.unit === "°";

                                        return (
                                            <div
                                                key={slider.id}
                                                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                                            >
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <label
                                                        htmlFor={`slider-${slider.id}`}
                                                        className="min-w-0 truncate text-xs font-semibold text-slate-700"
                                                    >
                                                        {slider.label}
                                                    </label>

                                                    <span className="shrink-0 rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-900 shadow-sm ring-1 ring-slate-200">
                                                        {isDegree
                                                            ? value.toFixed(0)
                                                            : value.toFixed(2)}

                                                        {slider.unit
                                                            ? ` ${slider.unit}`
                                                            : ""}
                                                    </span>
                                                </div>

                                                <input
                                                    id={`slider-${slider.id}`}
                                                    type="range"
                                                    min={slider.min}
                                                    max={slider.max}
                                                    step={
                                                        isDegree
                                                            ? 1
                                                            : 0.01
                                                    }
                                                    value={value}
                                                    onChange={(event) =>
                                                        handleSliderChange(
                                                            slider.id,
                                                            Number(
                                                                event.target
                                                                    .value
                                                            )
                                                        )
                                                    }
                                                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
                                                />

                                                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                                                    <span>
                                                        {slider.min}
                                                        {slider.unit
                                                            ? ` ${slider.unit}`
                                                            : ""}
                                                    </span>

                                                    <span>
                                                        {slider.max}
                                                        {slider.unit
                                                            ? ` ${slider.unit}`
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    )}


                    {/* ============================================= */}
                    {/* PARAMETER MATRIX                               */}
                    {/* ============================================= */}

                    {config.matrix && (
                        <section className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                                    {config.matrix.title}
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[520px] text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-white">
                                            {config.matrix.columns.map(
                                                (column) => (
                                                    <th
                                                        key={column.id}
                                                        className="whitespace-nowrap px-4 py-2.5 font-bold text-slate-500"
                                                    >
                                                        {column.label}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {config.sliders.map(
                                            (slider) => {
                                                const value =
                                                    slidersRef.current[
                                                    slider.id
                                                    ] ?? slider.default;

                                                return (
                                                    <tr
                                                        key={slider.id}
                                                        className="border-b border-slate-100 last:border-0"
                                                    >
                                                        {config.matrix.columns.map(
                                                            (column) => {
                                                                let cell:
                                                                    | string
                                                                    | number =
                                                                    "—";

                                                                switch (
                                                                column.id
                                                                ) {
                                                                    case "parameter":
                                                                        cell =
                                                                            slider.label;
                                                                        break;

                                                                    case "value":
                                                                        cell =
                                                                            slider.unit ===
                                                                                "°"
                                                                                ? value.toFixed(
                                                                                    0
                                                                                )
                                                                                : value.toFixed(
                                                                                    2
                                                                                );
                                                                        break;

                                                                    case "range":
                                                                        cell = `${slider.min} → ${slider.max}`;
                                                                        break;

                                                                    case "unit":
                                                                        cell =
                                                                            slider.unit ||
                                                                            "—";
                                                                        break;

                                                                    default:
                                                                        cell =
                                                                            "—";
                                                                }

                                                                return (
                                                                    <td
                                                                        key={
                                                                            column.id
                                                                        }
                                                                        className="px-4 py-2.5 text-slate-700"
                                                                    >
                                                                        {column.id ===
                                                                            "value" ? (
                                                                            <span className="font-bold text-slate-900">
                                                                                {cell}
                                                                            </span>
                                                                        ) : (
                                                                            cell
                                                                        )}
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}


                    {/* ============================================= */}
                    {/* METRICS                                        */}
                    {/* ============================================= */}

                    {config.metrics.length > 0 && (
                        <section className="mt-4">
                            <div
                                className={`grid gap-3 ${config.metrics.length === 1
                                    ? "grid-cols-1"
                                    : config.metrics.length === 2
                                        ? "grid-cols-1 sm:grid-cols-2"
                                        : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                                    }`}
                            >
                                {config.metrics.map(
                                    (metric) => {
                                        const value =
                                            metricsRef.current[
                                            metric.id
                                            ];

                                        return (
                                            <div
                                                key={metric.id}
                                                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                                            >
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                    {metric.label}
                                                </p>

                                                <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
                                                    {formatMetricValue(
                                                        value,
                                                        metric.unit
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    )}

                </div>
            </div>
            
        </div>
    );
}