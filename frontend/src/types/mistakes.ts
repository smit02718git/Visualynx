export type MistakeDetailData = {
  mistake_title: string;
  common_mistake: string;
  why_students_make_it: string;
  correct_understanding: string;
  how_to_avoid: string;
}

export type ConceptMistakesData = {
  subject?: string;
  concept: string;
  mistakes: MistakeDetailData[];
}