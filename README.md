# 🤖 Google Classroom Auto-Announcement Bot (Gemini + Classroom API)

## 📍 Overview
This project automates the posting of class announcements on Google Classroom using **Google Gemini (PaLM API)** and the **Google Classroom REST API**.  
It can generate personalized messages (e.g., meeting invites, reminders) and publish them directly to the Classroom stream — no manual posting required.

---

## ⚙️ Workflow Overview
The automation is built using an LLM orchestration tool (e.g., Flowise/N8n) and follows this sequence:

1. **Schedule Trigger**  
   Initiates the workflow at a predefined time (e.g., before class).

2. **HTTP Request #1 – Fetch Course Info**  
   Retrieves details of the Google Classroom course and active meeting links.

3. **HTTP Request #2 – Fetch Meet Link or Generate Meeting**  
   Calls the Google Meet API to create or confirm a class meeting URL.

4. **Gemini Chat Model Node**  
   Uses the `models/gemini-2.5-flash` model to generate an announcement text dynamically.  
   Example Output:Hi everyone! We're excited for our next class session; please join us at https://meet.google.com/ikk-pvgx-fdp
. We look forward to seeing you there!


5. **HTTP Request #3 – Post Announcement**  
Publishes the generated text to the Classroom stream via:POST https://classroom.googleapis.com/v1/courses/
<COURSE_ID>/announcements

🧩Requirements

Google Cloud Project with Classroom API enabled

Gemini (PaLM) API access

Automation platform (e.g., Flowise, N8n)

OAuth 2.0 credentials

🚀Usage

Configure your Google OAuth credentials and Classroom API access.

Replace <COURSE_ID> with your Classroom course’s ID.

Schedule the trigger (daily, weekly, or before each class).

Run the workflow — your announcement will appear automatically in Classroom.

