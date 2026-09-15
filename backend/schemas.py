from pydantic import BaseModel


class TopicInput(BaseModel):
    subject: str
    topic: str


class QuizInput(TopicInput):
    count: int


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatHistory(BaseModel):
    messages: list[ChatMessage]


class ChatInput(BaseModel):
    subject: str
    history: ChatHistory
