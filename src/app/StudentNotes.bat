@echo off
portqry -q -n localhost -e 8080 || start javaw -jar studentNotes-0.0.1-SNAPSHOT.jar
:loop-for-service
timeout /t 3 >null
portqry -q -n localhost -e 8080 || goto loop-for-service
portqry -q -n localhost -e 8081 || start mongoose-free-6.5.exe
:loop-for-web-server
timeout /t 1 >null
portqry -q -n localhost -e 8081 || goto loop-for-web-server
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:8081