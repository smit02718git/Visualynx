from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from viz_engine import generate_visualization_data
from learn_engine import explain_concept
from formulas_engine import get_concept_formulas
from common_mistakes_engine import get_concept_mistakes
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

@app.post("/api/visualization")
async def process_data(data: InputData):
    subject = data.subject
    topic = data.topic

    return await generate_visualization_data(subject, topic)

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
async def concept_formulas(data: InputData):
    subject = data.subject
    topic = data.topic

    return await get_concept_mistakes(subject, topic)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)