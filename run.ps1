# Starts the offline planner on localhost and opens the browser.
$ErrorActionPreference = "Stop"
$port = 5173
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting planner on http://localhost:$port ..." -ForegroundColor Green
Start-Job -ScriptBlock { Start-Sleep -Seconds 1; Start-Process "http://localhost:$port" } | Out-Null

$env:PORT = "$port"
node (Join-Path $here "server.js")
