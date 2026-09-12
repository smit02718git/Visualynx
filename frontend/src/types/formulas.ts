export type FormulaDetailData = {
  formula_name: string;
  main_formula: string;
  variables: string[];
  units: string[];
  when_to_use: string;
  common_mistake: string;
}

export type ConceptFormulasData = {
  subject: string;
  concept: string;
  formulas: FormulaDetailData[];
}