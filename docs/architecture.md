# GreenGuardian Architecture

## System Overview

GreenGuardian is an AI-powered platform for monitoring and analyzing local environmental conditions. The system architecture follows a modern client-server model with specialized components for data retrieval, analysis, and presentation.

## Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React.js       │     │  FastAPI        │     │  External       │
│  Frontend       │◄────┤  Backend        │◄────┤  Data Sources   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  CopilotKit     │     │  AI Agents      │     │  Tavily API     │
│  Integration    │     │  & Services     │     │  Weather API    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │
                                │
                                ▼
                        ┌─────────────────┐
                        │                 │
                        │  Storage        │
                        │  (Appwrite/Mem0)│
                        │                 │
                        └─────────────────┘
```

## Key Components

### Frontend (Next.js + CopilotKit)
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
