# AI-Powered Adaptive Quiz Setup Guide

## Overview
This implementation adds an AI-powered adaptive learning system that:
- Analyzes student performance by topic
- Generates personalized quizzes using AI APIs
- Provides intelligent recommendations
- Tracks learning progress and mastery levels

## API Keys Setup

### 1. Perplexity API (Primary)
1. Visit [Perplexity API](https://docs.perplexity.ai/)
2. Sign up for an account
3. Get your API key
4. Add to `backend/src/main/resources/application.yml`:
```yaml
perplexity:
  api:
    key: your_perplexity_api_key_here
```

### 2. Gemini API (Fallback)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `backend/src/main/resources/application.yml`:
```yaml
gemini:
  api:
    key: your_gemini_api_key_here
```

## Features Implemented

### Backend Components

1. **QuizResult Entity** - Tracks detailed quiz performance
2. **LearningAnalytics Entity** - Stores performance analytics by topic
3. **AIQuizService** - Generates adaptive quizzes using AI APIs
4. **AdaptiveLearningService** - Analyzes performance and provides recommendations
5. **AdaptiveQuizController** - REST endpoints for adaptive learning

### Frontend Components

1. **AdaptiveQuizComponent** - Main adaptive quiz interface with:
   - Performance dashboard with mastery levels
   - AI-powered recommendations
   - Topic-based quiz generation
   - Real-time analytics
   - Personalized feedback

### Key Features

#### 1. Performance Analytics
- **Overall Mastery**: Calculated across all topics
- **Topic Performance**: Individual topic mastery levels
- **Learning Style Detection**: Visual, Auditory, Kinesthetic, Reading
- **Trend Analysis**: Improving, Declining, Stable

#### 2. AI-Powered Quiz Generation
- **Adaptive Difficulty**: Based on student performance
- **Focused Content**: Targets weak concepts
- **Multiple APIs**: Perplexity (primary) + Gemini (fallback)
- **Fallback System**: Mock quizzes if APIs unavailable

#### 3. Personalized Recommendations
- **Weak Topics**: Areas needing improvement
- **Strong Topics**: Areas of excellence
- **Action Items**: Specific practice recommendations
- **Quiz Count**: Recommended number of practice quizzes

#### 4. Smart Learning Path
- **Topic Prioritization**: Focus on weak areas first
- **Progressive Difficulty**: Easier quizzes for struggling topics
- **Mastery Tracking**: Progress monitoring over time

## Usage Example

### Student Journey:
1. **Initial Assessment**: Takes quizzes on Linear Search (10/10) and Binary Search (3/10)
2. **AI Analysis**: System identifies Binary Search as weak topic
3. **Personalized Recommendations**: 
   - "Practice 3 more quizzes on Binary Search"
   - Generates easier Binary Search questions
4. **Adaptive Content**: AI creates focused Binary Search quizzes
5. **Progress Tracking**: Monitors improvement over time
6. **Smart Suggestions**: Recommends related topics when ready

### API Endpoints

```
GET /api/adaptive-quiz/recommendations/{courseId}
POST /api/adaptive-quiz/generate/{courseId}/{topic}
POST /api/adaptive-quiz/submit-result
GET /api/adaptive-quiz/analytics/{courseId}
GET /api/adaptive-quiz/available-topics/{courseId}
```

## Testing Without API Keys

The system includes comprehensive fallback mechanisms:
- Mock quiz generation when APIs are unavailable
- Sample analytics data for demonstration
- Offline-capable adaptive logic

## Database Collections

1. **quiz_results** - Individual quiz attempts
2. **learning_analytics** - Aggregated performance data
3. **quizzes** - Generated quiz content

## Running the System

1. **Backend**: `mvn spring-boot:run` (port 8080)
2. **Frontend**: `npm start` (port 4200)
3. **Access**: Navigate to `/adaptive-quiz` in the application

## Demo Data

The system includes realistic demo data showing:
- Student with 85% mastery in Linear Search
- Student struggling with Binary Search (45%)
- AI recommendations for focused practice
- Progressive difficulty adjustment

This creates a complete adaptive learning ecosystem that personalizes education based on individual student performance and learning patterns.