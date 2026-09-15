from dotenv import load_dotenv
from typing import List
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from gemini_client import invoke_with_fallback

load_dotenv()

# Define the schema for a single mistake analysis
class MistakeDetail(BaseModel):
    mistake_title: str = Field(
        description="A concise title for the common mistake (e.g., 'Confusing path length with displacement')."
    )
    common_mistake: str = Field(
        description="A detailed description of the incorrect assumption, calculation, or reasoning students frequently make."
    )
    why_students_make_it: str = Field(
        description="The underlying conceptual misconception, intuitive trap, or cognitive reason why this mistake happens."
    )
    correct_understanding: str = Field(
        description="The correct scientific/academic principle and explanation that resolves the misconception."
    )
    how_to_avoid: str = Field(
        description="Practical advice, mental checks, or tips to avoid making this mistake during problem-solving."
    )


# Define the root schema containing a list of mistakes
class ConceptMistakes(BaseModel):
    subject: str = Field(description="The academic subject.")
    concept: str = Field(description="The specific concept being analyzed.")
    mistakes: List[MistakeDetail] = Field(
        description="A list of common mistakes related to the concept."
    )


async def get_concept_mistakes(subject: str, concept: str) -> dict:
    """
    Fetches a structured analysis of common mistakes for a given concept in a subject.
    """
    # System prompt to guide the AI persona and output quality
    system_prompt = (
        "You are an expert tutor and academic mentor. Your goal is to identify common "
        "student misconceptions and mistakes for specific academic concepts. "
        "Provide insightful, empathetic breakdowns of why students fall into these traps "
        "and offer clear, actionable guidance on the correct understanding."
    )

    # User prompt built using standard Python f-strings
    user_prompt = (
        f"Subject: {subject}\n"
        f"Concept: {concept}\n\n"
        f"Please analyze the most frequent and critical mistakes students make when "
        f"learning '{concept}' in '{subject}', strictly following the structured schema."
    )

    messages = [
        ("system", system_prompt),
        ("human", user_prompt)
    ]

    response = await invoke_with_fallback(
        messages,
        lambda llm: llm.with_structured_output(ConceptMistakes),
        preferred_key=4,
    )

    if isinstance(response, BaseModel):
        return response.model_dump() if hasattr(response, "model_dump") else response.dict()

    if isinstance(response, dict):
        return response

    raise TypeError(
        f"Gemini returned an unsupported response type: {type(response).__name__}"
    )