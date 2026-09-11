from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from viz_engine import generate_visualization_data
from learn_engine import explain_concept
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)