Google Classroom + Meet Automation using n8n
🧩 Overview

This project automates the process of creating and sharing Google Meet links for classes using Google Classroom API and Google Meet API, orchestrated through the n8n automation framework.

Instead of manually generating and posting meeting links, this workflow automatically:

Retrieves classroom details,

Creates a new Google Meet session, and

Posts the Meet link back to the relevant class or stream announcement.

The entire system is built and executed in a Dockerized n8n environment, ensuring consistency and scalability.

⚙️ Features

✅ Automates Google Meet creation for specific Google Classroom courses
✅ Dynamically fetches Course IDs and metadata from Classroom API
✅ Posts Meet links directly to class streams or announcements
✅ OAuth2-secured access to Google APIs
✅ Fully visual, low-code workflow design with n8n
✅ Extensible — supports AI, scheduling, and analytics add-ons

🧠 Tech Stack
Category	Tool / Framework	Purpose
Automation Framework	🧩 n8n	Visual workflow builder for integration and orchestration
Containerization	🐳 Docker	Runs n8n in a local isolated environment
APIs	☁️ Google Classroom API, Google Meet API	Classroom management & Meet link generation
Authentication	🔐 OAuth 2.0 (Google)	Secure credential handling
Language Runtime	⚙️ Node.js (via n8n)	Executes workflow logic & JavaScript functions
Storage	💾 SQLite (default n8n DB)	Internal workflow and credential persistence

Future Enhancements (Planned)

🔹 AI Agent Integration:
– Summarize Meet recordings using OpenAI/Gemini and post class recaps.

🔹 Smart Scheduler:
– Auto-schedule Meets based on calendar or assignment deadlines.

🔹 Performance Analytics:
– Track and visualize class engagement metrics with Google Sheets or Streamlit dashboard.


