@echo off
title CounterWeb GSI
cd /d "%~dp0"
echo ============================================
echo   CounterWeb — живой драфт (GSI relay)
echo ============================================
echo.
echo Устанавливаю cfg в Dota 2 и запускаю сервер...
where node >nul 2>nul
if errorlevel 1 (
  echo [ОШИБКА] Node.js не найден. Установите с https://nodejs.org
  pause
  exit /b 1
)
start "CounterWeb GSI" cmd /k "node gsi-server.js"
echo.
echo Сервер запущен. Открываю сайт...
timeout /t 2 /nobreak >nul
start "" "dota-counter-web.html"
echo.
echo Готово! Держите окно сервера открытым во время драфта.
echo Чтобы закрыть: закройте окно "CounterWeb GSI".
pause
