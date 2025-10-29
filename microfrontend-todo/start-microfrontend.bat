@echo off
echo Starting React Microfrontend...
cd /d "d:\PlanningReact\microfrontend-todo\todoproject"
start "React App" cmd /k "npm run dev"

echo Waiting 5 seconds for React app to start...
timeout /t 5 /nobreak > nul

echo Starting Angular Container...
cd /d "d:\PlanningReact\microfrontend-todo\container-angular"
start "Angular Container" cmd /k "npm start"

echo Both applications are starting...
echo React App: http://localhost:3001
echo Angular Container: http://localhost:4200
pause