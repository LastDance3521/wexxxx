@echo off
setlocal
chcp 65001 >nul
title USTA SIKENZO HACK AI v13.8 ULTIMATE
color 0A

cls
echo  ================================================
echo       USTA SIKENZO HACK AI  v13.8 ULTIMATE
echo       PYTHON + C++ + EXPLOIT ENGINE AKTIF
echo  ================================================
echo.

:: =====================================================
:: ADIM 1: Eski portlari temizle
:: =====================================================
echo [*] Portlar temizleniyor (3000 ve 8080)...
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":3000 " ^| findstr LISTENING') do (
    taskkill /F /PID %%p >nul 2>&1
)
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":8080 " ^| findstr LISTENING') do (
    taskkill /F /PID %%p >nul 2>&1
)
echo [OK] Portlar temiz.
echo.

:: =====================================================
:: ADIM 2: Python kurulu mu kontrol et - Yoksa kur
:: =====================================================
echo [*] Python kontrol ediliyor...
"C:\Users\xpgcc\AppData\Local\Programs\Python\Python312\python.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Python bulunamadi. Yukleniyor...
    winget install Python.Python.3.12 --silent --accept-package-agreements --accept-source-agreements
    echo [OK] Python yuklendi.
) else (
    echo [OK] Python hazir.
)
echo.

:: =====================================================
:: ADIM 3: Python kutuphaneleri kur (requests, scapy, etc.)
:: =====================================================
echo [*] Python kutuphaneleri yukleniyor...
"C:\Users\xpgcc\AppData\Local\Programs\Python\Python312\python.exe" -m pip install --upgrade pip --quiet
"C:\Users\xpgcc\AppData\Local\Programs\Python\Python312\python.exe" -m pip install requests scapy colorama psutil cryptography paramiko --quiet
echo [OK] Kutuphane kurulumlar tamamlandi.
echo.

:: =====================================================
:: ADIM 4: Visual Studio C++ Build Tools kurulu mu?
:: =====================================================
echo [*] C++ derleyici kontrol ediliyor...
where cl.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] C++ Build Tools bulunamadi. Yukleniyor... (Bu su an arka planda calisiyor)
    winget install Microsoft.VisualStudio.2022.BuildTools --silent --accept-package-agreements --accept-source-agreements --override "--quiet --add Microsoft.VisualStudio.Workload.VCTools"
    echo [OK] C++ Build Tools kurulumu baslatildi.
) else (
    echo [OK] C++ derleyici hazir.
)
echo.

:: =====================================================
:: ADIM 5: Bun/Node kontrol et
:: =====================================================
echo [*] Bun runtime kontrol ediliyor...
"C:\Users\xpgcc\.bun\bin\bun.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Bun bulunamadi. Yukleniyor...
    powershell -Command "irm bun.sh/install.ps1 | iex"
    echo [OK] Bun yuklendi.
) else (
    echo [OK] Bun hazir.
)
echo.

:: =====================================================
:: ADIM 6: Web panelini baslat (arka planda)
:: =====================================================
echo [*] Web panel port 8080 baslatiliyor...
start /B "" "C:\Users\xpgcc\.bun\bin\bunx.exe" serve -p 8080 "c:\Users\xpgcc\Desktop\web  ste chat   data\new proje"
timeout /t 2 >nul
echo [OK] Web panel baslatildi.
echo.

:: =====================================================
:: OZET
:: =====================================================
echo  ================================================
echo   WEB PANEL  : http://localhost:8080/app/index.html
echo   AI SERVER  : http://localhost:3000
echo   PYTHON     : AKTIF
echo   C++        : AKTIF
echo   EXPLOIT    : AKTIF
echo   DURUM      : FULL ROOT - BU PENCEREYI KAPATMA
echo  ================================================
echo.

:: =====================================================
:: ADIM 7: AI Beyin baslatiliyor (on planda - log goster)
:: =====================================================
echo [*] AI Beyin v13.8 ULTIMATE uyandiriliyor...
echo.

"C:\Users\xpgcc\.bun\bin\bun.exe" "c:\Users\xpgcc\Desktop\web  ste chat   data\backend\ai-server.js"

echo.
echo [!] Sunucu durdu. Yeniden baslatmak icin bir tusa basin.
pause >nul
goto :eof
