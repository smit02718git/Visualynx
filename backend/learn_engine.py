import os
from dotenv import load_dotenv
from typing import Optional
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()  

# Define the desired schema using Pydantic
class ConceptExplanation(BaseModel):
    question: str = Field(
        description="A natural question asking about the concept, e.g., 'What is projectile motion?'"
    )
    definition: str = Field(
        description="A formal and clear definition of the concept."
    )
    core_idea: str = Field(
        description="The primary takeaway or central mechanism driving this concept."
    )
    intuition: str = Field(
        description="A simple, real-world analogy or intuitive way to picture the concept."
    )
    think_about_it: str = Field(
        description="A thought-provoking question or mini-scenario to help the reader apply or reflect on the concept."
    )


async def explain_concept(subject: str, concept: str) -> ConceptExplanation:
    """
    Generates a structured explanation for a given concept in a subject using LangChain and Gemini.
    """

    api_key = os.getenv("GEMINI_API_KEY_2")

    if not api_key:
        raise ValueError(
            "Missing GEMINI_API_KEY_2 value inside server configuration."
        )

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        google_api_key=api_key,
        timeout=60,
        max_retries=1,
    )

    # Enforce the structured output schema
    structured_llm = llm.with_structured_output(ConceptExplanation)

    # Define system prompt
    system_prompt = (
        "You are an expert educator. Your task is to break down academic or technical concepts "
        "into clear, highly intuitive, and structured explanations suitable for students. "
        "Provide precise definitions along with relatable mental models."
    )

    # Construct user prompt using standard Python f-strings
    user_prompt = (
        f"Subject: {subject}\n"
        f"Concept: {concept}\n\n"
        f"Please explain the concept of '{concept}' in the context of '{subject}' following the structured schema."
    )

    # Combine system message and user message into a prompt list
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
