# backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return {"message": "pong"}

@app.post("/chat")
async def chat(req: Request):
    try:
        body = await req.json()
        userMessage = body.get("message")
        if not userMessage:
            return {"error": "Message is required"}
            
        previousResponseId = body.get("previousResponseId")

        response = client.responses.create(
            model="gpt-4o",
            input=userMessage,
            instructions="Respond with robotic language. Add one robotic emoji to each response.",
            previous_response_id=previousResponseId
        )
        
        return response
    
    except Exception as e:
        return {"error": str(e)}