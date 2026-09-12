import os
from typing import List
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

# Define the schema for an individual formula
class FormulaDetail(BaseModel):
    formula_name: str = Field(
        description="The common name of the formula (e.g., '<p><i>R</i> = (<i>v</i><sup>2</sup> &bull; sin(2<i>&theta;</i>)) / <i>g</i></p>')."
    )
    main_formula: str = Field(
        description="The mathematical equation/formula written clearly in html (e.g., 'R = (v^2 * sin(2θ)) / g')."
    )
    variables: List[str] = Field(
        description="List of variables in the formula with their descriptions (e.g., ['R = Horizontal range', 'v = Initial velocity'])."
    )
    units: List[str] = Field(
        description="SI units associated with each variable (e.g., ['R: meters (m)', 'v: meters per second (m/s)'])."
    )
    when_to_use: str = Field(
        description="Conditions or problem scenarios where this specific formula should be applied."
    )
    common_mistake: str = Field(
        description="A common error students make when using this formula (e.g., forgetting to square velocity or mixing up degrees/radians)."
    )


# Define the container schema for multiple formulas
class ConceptFormulas(BaseModel):
    subject: str = Field(description="The academic subject.")
    concept: str = Field(description="The specific concept being covered.")
    formulas: List[FormulaDetail] = Field(
        description="A list of key formulas related to the concept."
    )


async def get_concept_formulas(subject: str, concept: str) -> dict:
    """
    Fetches structured formula details for a given concept in a subject.
    """
    api_key = os.getenv("GEMINI_API_KEY_3")
    if not api_key:
        raise ValueError("GEMINI_API_KEY_3 environment variable is missing.")

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        google_api_key=api_key,
        temperature=0.2,
    )

    # Enforce structured output schema
    structured_llm = llm.with_structured_output(ConceptFormulas)

    # System prompt to instruct the AI
    system_prompt = (
        "You are an expert STEM educator and tutor. Your task is to extract and break down "
        "all essential formulas for a given concept into clear, structured components. "
        "formulas must be written in html format"
        "Ensure formulas, variable definitions, units, usage conditions, and common student mistakes "
        "are completely accurate and easy to learn."
    )

    # User prompt formatted using standard Python f-strings
    user_prompt = (
        f"Subject: {subject}\n"
        f"Concept: {concept}\n\n"
        f"Please provide all key formulas associated with the concept of '{concept}' "
        f"in the subject '{subject}' using the structured schema."
    )

    messages = [
        ("system", system_prompt),
        ("human", user_prompt)
    ]

    response = await structured_llm.ainvoke(messages)

    if isinstance(response, BaseModel):
        return response.model_dump() if hasattr(response, "model_dump") else response.dict()

    if isinstance(response, dict):
        return response

    raise TypeError(
        f"Gemini returned an unsupported response type: {type(response).__name__}"
    )
