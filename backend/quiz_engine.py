from typing import List
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from gemini_client import invoke_with_fallback

load_dotenv()


class QuizQuestion(BaseModel):
    question: str
    options: List[str] = Field(min_length=4, max_length=4)
    answer: int = Field(ge=0, le=3)
    explanation: str


class QuizPayload(BaseModel):
    questions: List[QuizQuestion]


async def generate_quiz(subject: str, topic: str, count: int) -> dict:
    prompt = (
        f"Create exactly {count} multiple-choice questions for a student studying {topic} in {subject}. "
        "Use four distinct options, set answer to the zero-based index of the correct option, and give a concise explanation. "
        "Vary conceptual and applied questions. Avoid trick questions and do not include markdown."
    )
    response = await invoke_with_fallback([
        ("system", "You are a precise, encouraging STEM assessment writer."),
        ("human", prompt),
    ], lambda llm: llm.with_structured_output(QuizPayload), preferred_key=6, temperature=0.4, timeout=60)
    if isinstance(response, BaseModel):
        return response.model_dump()
    if isinstance(response, dict):
        return response
    raise TypeError(f"Gemini returned an unsupported response type: {type(response).__name__}")
