from pydantic import BaseModel
from gemini_client import invoke_with_fallback


class TopicRelevance(BaseModel):
    is_related: bool


async def validate_topic(subject: str, topic: str) -> dict:
    response = await invoke_with_fallback([
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
    ], lambda llm: llm.with_structured_output(TopicRelevance), preferred_key=3, temperature=0, timeout=30)

    if isinstance(response, BaseModel):
        return response.model_dump()
    if isinstance(response, dict):
        return response
    raise TypeError(f"Gemini returned an unsupported response type: {type(response).__name__}")
