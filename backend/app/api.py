from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from sqlmodel import Session, select
from app.db import get_session
from app.models import Document, GeneratedItem
from app.ai_client import call_openai

router = APIRouter()

@router.post('/documents')
async def create_document(title: str = Form(...), text: str = Form(None), file: UploadFile = File(None)):
    if file:
        content = (await file.read()).decode('utf-8')
    elif text:
        content = text
    else:
        raise HTTPException(status_code=400, detail='No content')

    doc = Document(title=title, content=content)
    with get_session() as s:
        s.add(doc)
        s.commit()
        s.refresh(doc)
    return {'id': doc.id, 'title': doc.title}

@router.post('/summarize')
async def summarize(doc_id: int):
    with get_session() as s:
        doc = s.exec(select(Document).where(Document.id==doc_id)).first()
        if not doc:
            raise HTTPException(404, 'doc not found')
    prompt = f"Summarize the following text into a concise paragraph and 3 bullet points:\n\n{doc.content}"
    result = await call_openai(prompt, max_tokens=400)
    gen = GeneratedItem(doc_id=doc.id, type='summary', payload=result)
    with get_session() as s:
        s.add(gen)
        s.commit()
        s.refresh(gen)
    return {'id': gen.id, 'payload': result}

@router.post('/generate-questions')
async def generate_questions(doc_id: int, num_questions: int = 5):
    with get_session() as s:
        doc = s.exec(select(Document).where(Document.id==doc_id)).first()
        if not doc:
            raise HTTPException(404, 'doc not found')
    prompt = f"Generate {num_questions} multiple choice questions (with 4 options each) and indicate the correct answer. Use the following text as source:\n\n{doc.content}"
    result = await call_openai(prompt, max_tokens=600)
    gen = GeneratedItem(doc_id=doc.id, type='quiz', payload=result)
    with get_session() as s:
        s.add(gen)
        s.commit()
        s.refresh(gen)
    return {'id': gen.id, 'payload': result}

@router.post('/flashcards')
async def flashcards(doc_id: int, count: int = 10):
    with get_session() as s:
        doc = s.exec(select(Document).where(Document.id==doc_id)).first()
        if not doc:
            raise HTTPException(404, 'doc not found')
    prompt = f"Create {count} concise flashcard Q/A pairs from the following text:\n\n{doc.content}"
    result = await call_openai(prompt, max_tokens=500)
    gen = GeneratedItem(doc_id=doc.id, type='flashcards', payload=result)
    with get_session() as s:
        s.add(gen)
        s.commit()
        s.refresh(gen)
    return {'id': gen.id, 'payload': result}

@router.get('/history/{doc_id}')
async def history(doc_id: int):
    with get_session() as s:
        items = s.exec(select(GeneratedItem).where(GeneratedItem.doc_id==doc_id)).all()
    return items