#!/bin/bash

echo "Starting SkillForge Platform..."

# Start Spring Boot backend
echo "Starting Spring Boot backend..."
cd backend
mvn clean spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start Angular frontend
echo "Starting Angular frontend..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo "SkillForge is starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:4200"
echo ""
echo "Test credentials:"
echo "Student: student / password"
echo "Instructor: instructor / password" 
echo "Admin: admin / password"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID