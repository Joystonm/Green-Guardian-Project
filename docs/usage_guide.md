# GreenGuardian Usage Guide

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- Appwrite account
- API keys for:
  - Tavily
  - OpenAI
  - Weather API
  - Mem0
  - Keywords AI

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/GreenGuardian.git
cd GreenGuardian
```

#### 2. Set up environment variables

Copy the example environment file and fill in your API keys:

```bash
cp .env.example .env
```

Edit the `.env` file with your API keys and configuration.

#### 3. Install frontend dependencies

```bash
npm install
```

#### 4. Install backend dependencies

```bash
pip install -r requirements.txt
```

### Running the Application

#### Start the backend server

```bash
cd backend
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

#### Start the frontend development server

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Using GreenGuardian

### Dashboard

The main dashboard displays:
- Interactive map with pollution and risk zones
- Environmental risk summary
- Preventive advice panel
- Chat assistant button

### Map Navigation

- Click and drag to move around the map
- Click on colored zones to see detailed information
- Use the zoom controls to zoom in and out

### Environmental Risk Summary

The risk summary panel shows:
- Overall environmental risk level
- Air quality index
- Water quality status
- UV index
- Pollen count

### Preventive Advice

The advice panel provides:
- General recommendations based on current conditions
- Specific advice for different environmental factors
- Preventive measures for long-term health

### Chat Assistant

Click the chat button in the bottom right to:
- Ask questions about local environmental conditions
- Get personalized health recommendations
- Learn about environmental data and measurements
- Receive guidance on preventive actions

## API Documentation

The backend API is available at http://localhost:8000/docs when running in development mode.

### Key Endpoints

- `GET /api/environmental-data`: Get environmental data for a location
- `GET /api/risk-assessment`: Get risk assessment for a location
- `GET /api/advice`: Get preventive advice for a location
- `POST /api/chat`: Send a message to the chat assistant

## Troubleshooting

### Common Issues

#### API Key Errors

If you see "API key not valid" errors:
- Check that you've added all required API keys to your `.env` file
- Verify that the API keys are correct and active

#### Map Not Loading

If the map doesn't load:
- Check your internet connection
- Ensure that your browser allows location access

#### Backend Connection Issues

If the frontend can't connect to the backend:
- Verify that the backend server is running
- Check that the `NEXT_PUBLIC_BACKEND_URL` in your `.env` file is correct

## Getting Help

If you encounter issues not covered in this guide:
- Check the GitHub repository issues
- Contact support at support@greenguardian.example.com
