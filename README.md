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

## Key Components

### Frontend
- **MapView**: Interactive map visualization of pollution and risk zones
- **RiskSummary**: Environmental risk assessment display
- **AdvicePanel**: Preventive advice based on local conditions
- **ChatAgent**: AI-powered chat assistant for environmental queries

### Backend (Python FastAPI)
- **API Layer**: RESTful endpoints for data retrieval and processing
- **Agent Layer**: AI agents for specialized tasks
  - **PollutionAgent**: Processes pollution data from various sources
  - **AdviceAgent**: Generates recommendations based on environmental data
  - **MemoryAgent**: Manages conversation history and context

### Services
- **TavilyService**: Integration with Tavily for environmental data retrieval
- **Mem0Service**: Memory storage for conversation context
- **AppwriteService**: User management and database operations
- **WeatherAPI**: Integration with weather data providers
- **KeywordsAI**: Monitoring and tracing for AI operations

### Storage
- **Appwrite**: Primary database for user data, regions, and environmental records
- **Mem0**: Memory storage for conversation context and historical queries

## Data Flow

1. User interacts with the frontend interface
2. Frontend makes API calls to the backend
3. Backend retrieves data from external sources via services
4. AI agents process and analyze the data
5. Results are stored in the database and returned to the frontend
6. Frontend displays the processed data to the user

## Monitoring and Logging

- **KeywordsAI**: Monitors LLM operations and traces API calls
- **Appwrite Logs**: Stores system events and user interactions

## Deployment Architecture

The system is designed to be deployed as:
- Frontend: Vercel or similar static hosting
- Backend: Containerized service on AWS, GCP, or Azure
- Database: Appwrite Cloud or self-hosted instance


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
