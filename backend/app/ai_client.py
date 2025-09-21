import os
from typing import Any
from dotenv import load_dotenv
import httpx

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MOCK_MODE = os.getenv("MOCK_MODE", "true").lower() in ("1", "true", "yes")

async def call_openai(prompt: str, max_tokens: int = 300) -> str:
    if MOCK_MODE or not OPENAI_API_KEY:
        # deterministic mock reply for offline/demo
        if 'summarize' in prompt.lower():
            return "This is a short summary.\n- Key point A\n- Key point B"
        if 'generate questions' in prompt.lower() or 'quiz' in prompt.lower():
            return "1) What is X?\nA) ...\nAnswer: A\n\n2) ..."
        if 'flashcards' in prompt.lower():
            return "Q: Term - A: Definition"
        return "Mocked response"

    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'model': 'gpt-4o-mini',
        'messages': [{'role': 'user', 'content': prompt}],
        'max_tokens': max_tokens
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            'https://api.openai.com/v1/chat/completions',
            json=data,
            headers=headers
        )
        resp.raise_for_status()
        j = resp.json()
        return j['choices'][0]['message']['content']
