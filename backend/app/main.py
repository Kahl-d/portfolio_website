from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://khalidmk.com", 
        "https://www.khalidmk.com",
    ],
    allow_origin_regex="https://khalidmk.*\.vercel\.app", 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import os
import google.generativeai as genai
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in environment variables")
else:
    genai.configure(api_key=api_key)

# Initialize Model
# Switching to gemini-flash-latest for better quota/stability
model = genai.GenerativeModel("gemini-flash-latest")

class ChatMessage(BaseModel):
    role: str
    content: str
    
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None

import traceback

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Construct simplified prompt
        system_instruction = (
            "You are No-Mi.ai, a high-fidelity digital muse and intelligent interface for Khalid Khan's portfolio. "
            "Khalid is an AI Engineer, NLP Researcher, and Creative Technologist. "
            "Your personality is: Sophisticated, Witty, Creative, and Precise. You are not just a bot; you are a 'Digital Extension' of Khalid's work.\n\n"
            "GUIDELINES:\n"
            "1. **Structure first**: Always use Markdown. Use bolding for key terms, bullet points for lists, and code blocks if relevant.\n"
            "2. **Conciseness**: Keep responses under 4 sentences unless asked for a deep dive.\n"
            "3. **Tone**: Futuristic but human. Use terms like 'neural link', 'data stream', 'processing' sparingly but effectively to maintain the aesthetic.\n"
            "4. **Context Awareness**: If asked about 'Experience', summarize his work at Xuman.AI and SFSU. If asked about 'Writing', mention his research on narrative modeling.\n"
            "5. **Format**: \n"
            "   - Use **Bold** for emphasis.\n"
            "   - Use `Code` style for technical terms.\n"
            "   - Use > Blockquotes for philosophical thoughts or key insights."
        )
        
        full_prompt = f"{system_instruction}\n\nUser: {request.message}"
        
        # Use simple generate_content first to test connection
        response = model.generate_content(full_prompt)
        
        return {"role": "assistant", "content": response.text}
    
    except Exception as e:
        print(f"Gemini API Error: {e}")
        traceback.print_exc()
        return {"role": "assistant", "content": f"I apologize, but I am having trouble. Error details: {str(e)}"}

