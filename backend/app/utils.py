import io
import pdfplumber


async def extract_text_from_file(upload_file) -> str:
# upload_file is SpooledTemporaryFile from FastAPI UploadFile
 filename = upload_file.filename.lower()
 content = await upload_file.read()
 if filename.endswith('.pdf'):
  text = ''
  with pdfplumber.open(io.BytesIO(content)) as pdf:
   for p in pdf.pages:
    text += p.extract_text() or '\n'
  return text
 else:
  return content.decode('utf-8')