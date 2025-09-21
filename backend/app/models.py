from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Document(SQLModel, table=True):
 id: Optional[int] = Field(default=None, primary_key=True)
title: str
content: str
created_at: datetime = Field(default_factory=datetime.utcnow)


class GeneratedItem(SQLModel, table=True):
 id: Optional[int] = Field(default=None, primary_key=True)
doc_id: int
type: str # 'summary', 'quiz', 'flashcards'
payload: str
created_at: datetime = Field(default_factory=datetime.utcnow)