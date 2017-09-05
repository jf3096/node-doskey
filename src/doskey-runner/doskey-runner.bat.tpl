@echo off

cd /d %~dp0
set "DEST_FILE_PATH=%USERPROFILE%\cmd-doskey.bat"
set "REGISTRY_PATH=HKEY_CURRENT_USER\Software\Microsoft\Command Processor"
REM copy %cd%\cmd-doskey.bat %USERPROFILE%\cmd-doskey.bat

(
echo @echo off
@@SCRIPTS@@
)>%USERPROFILE%\cmd-doskey.bat

reg query "%REGISTRY_PATH%" /v AutoRun
if %ERRORLEVEL% EQU 1 goto add-to-registry

:add-to-registry
reg add "%REGISTRY_PATH%" /v  AutoRun /t REG_SZ /d "%DEST_FILE_PATH%" /f
