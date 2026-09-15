import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel

load_dotenv()


class TopicRelevance(BaseModel):
    is_related: bool


async def validate_topic(subject: str, topic: str) -> dict:
    api_key = os.getenv("GEMINI_API_KEY_5")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY_5 value inside server configuration.")

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        google_api_key=api_key,
        temperature=0,
        timeout=30,
        max_retries=1,
    )
    structured_llm = llm.with_structured_output(TopicRelevance)
    response = await structured_llm.ainvoke([
        (
            "system",
            "You classify whether a student topic belongs to the selected academic subject. "
            "Return true for concepts, applications, methods, and standard subtopics of the subject. "
            "Return false for unrelated subjects, people, places, entertainment, or everyday requests."
        ),
        (
            "human",
            f"Selected subject: {subject}\nStudent topic: {topic}\nIs the topic related to the selected subject?"
        ),
    ])

    if isinstance(response, BaseModel):
        return response.model_dump()
    if isinstance(response, dict):
        return response
    raise TypeError(f"Gemini returned an unsupported response type: {type(response).__name__}")
