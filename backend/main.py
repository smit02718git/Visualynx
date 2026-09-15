from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from viz_engine import generate_visualization_data
from learn_engine import explain_concept
from formulas_engine import get_concept_formulas
from common_mistakes_engine import get_concept_mistakes
from chat_engine import subject_chatbot
from quiz_engine import generate_quiz
from topic_validator import validate_topic
import uvicorn

app = FastAPI()

# 1. Configure CORS to allow requests from your Next.js local server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],                      
    allow_headers=["*"],                      
)

class InputData(BaseModel):
    subject: str
    topic: str

class TopicValidationInput(InputData):
    pass

class QuizInput(InputData):
    count: int

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatHistory(BaseModel):
    messages: list[ChatMessage]

class ChatInput(BaseModel):
    subject: str
    history: ChatHistory
    
@app.post("/api/visualization")
async def process_data(data: InputData):
    subject = data.subject
    topic = data.topic

    return await generate_visualization_data(subject, topic)

@app.post("/api/validate-topic")
async def topic_validation(data: TopicValidationInput):
    try:
        result = await validate_topic(data.subject, data.topic)
    except Exception as error:
        raise HTTPException(status_code=503, detail=f"Topic validation is temporarily unavailable: {error}") from error
    if not result.get("is_related", False):
        return {
            "is_related": False,
            "message": f"This concept is not related to {data.subject}.",
        }
    return {"is_related": True}

@app.post("/api/learn")
async def learn_concept(data: InputData):
    subject = data.subject
    topic = data.topic

    return await explain_concept(subject, topic)

@app.post("/api/formulas")
async def concept_formulas(data: InputData):
    subject = data.subject
    topic = data.topic

    return await get_concept_formulas(subject, topic)

@app.post("/api/mistakes")
async def common_mistakes(data: InputData):
    subject = data.subject
    topic = data.topic

    return await get_concept_mistakes(subject, topic)

@app.post("/api/chat")
async def chat(data: ChatInput):
    return await subject_chatbot(
        history=data.history.model_dump(),
        subject=data.subject,
    )

@app.post("/api/quiz")
async def quiz(data: QuizInput):
    count = max(5, min(data.count, 30))
    return await generate_quiz(data.subject, data.topic, count)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)