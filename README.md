# GreenGuardian – AI for Local Environmental Monitoring

An AI-powered platform for monitoring and analyzing local environmental conditions.

## Overview
GreenGuardian provides real-time environmental monitoring, risk assessment, and personalized advice to help users understand and respond to environmental conditions in their area.

## Features
- Interactive map visualization of pollution and risk zones
- Environmental risk summaries
- Preventive advice based on local conditions
- AI-powered chat assistant for environmental queries
- Historical environmental data analysis

## Tech Stack
- Frontend: React.js with CopilotKit
- Backend: Python FastAPI
- Data Sources: Tavily, weather APIs
- Storage: Appwrite, Mem0
- Monitoring: Keywords AI

## Getting Started

### Prerequisites
- Node.js, Python 3.10+, Appwrite Cloud account
- Tavily API key (https://tavily.com)
- Mem0 account & key (https://mem0.ai)
- Keywords AI token (https://keywords.ai)
- CopilotKit setup (https://docs.copilotkit.ai)
- Appwrite cloud
- Open Weather Api

### Frontend Setup
1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the `.env` file has your API keys:
   ```
   TAVILY_API_KEY=

   # Appwrite Configuration
   APPWRITE_ENDPOINT=
   APPWRITE_PROJECT_ID=
   APPWRITE_API_KEY=
   
   
   # Mem0 Configuration
   MEM0_API_KEY=

   # Weather API Configuration
   WEATHER_API_KEY=
   
   # Keywords AI Configuration
   KEYWORDS_AI_API_KEY=
   
   # Environment
   NODE_ENV=development

   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

## Project Structure
```
GreenGuardian/
├── frontend/       → React.js + CopilotKit UI
├── backend/        → Python FastAPI with agent services
├── services/       → Tavily, Mem0, Appwrite integrations
├── public/         → Static assets, icons
├── scripts/        → Dev tools and test seeders
├── database/       → Appwrite schema
├── .env            → API keys and tokens
└── README.md
```
