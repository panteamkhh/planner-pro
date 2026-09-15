@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   Planner (offline) - http://localhost:5173
echo.
start "" http://localhost:5173
where node >nul 2>nul
if %errorlevel%==0 (
  node server.js
) else (
  python -m http.server 5173
)
