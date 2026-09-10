export type ControlSlider = {
  id: string;
  label: string;
  min: number;
  max: number;
  default: number;
  unit: string;
};

export type MatrixColumn = {
  id: "parameter" | "value" | "range" | "unit";
  label: string;
};

export type MatrixConfig = {
  title: string;
  columns: MatrixColumn[];
};

export type MetricCard = {
  id: string;
  label: string;
  unit: string;
};

export type MetricState = Record<string, unknown>;

export type RuntimeState = Record<string, any>;

export type CanvasScript = (
  ctx: CanvasRenderingContext2D,
  sliders: Record<string, number>,
  metrics: MetricState,
  runtime: RuntimeState,
) => void;

export type VisualizationConfig = {
  concept_name: string;
  sliders: ControlSlider[];
  matrix: MatrixConfig;
  metrics: MetricCard[];
  metric_script: string;
  canvas_script: string;
};