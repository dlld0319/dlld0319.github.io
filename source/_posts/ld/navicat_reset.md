---
title: Navicat Premium 15\16 重置试用时间
categories:
- 小技巧
tags:
- code
excerpt: bat 文件即可
---


- 创建一个bat 文件即可

```


@echo off

echo\
echo\
echo 适用于 Navicat V15 V16
echo 正在清除试用信息。。。

for /f %%i in ('reg query HKCU\Software\Classes\CLSID') do call:checkDelCLSID %%i

#reg delete HKCR\NavicatProfileBackup /f 1>nul 2>nul 
#reg delete HKCR\NavicatProfileBatchJob /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileDataSync /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileExport /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileImport /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileModel /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileStructureSync /f 1>nul 2>nul
#reg delete HKCR\NavicatProfileTransfer /f 1>nul 2>nul
reg delete HKCU\Software\PremiumSoft\NavicatPremium /f 1>nul 2>nul
reg add HKCU\Software\PremiumSoft\NavicatPremium /v "AlreadyShowNavicatV16WelcomeScreen" /t REG_DWORD  /d 1 /f
reg add HKCU\Software\PremiumSoft\NavicatPremium /v "AutoCheckUpdate" /t REG_DWORD /d 1 /f
reg add HKCU\Software\PremiumSoft\NavicatPremium /v "AlreadyScanDeprecatedReport" /t REG_DWORD /d 1 /f
reg add HKCU\Software\PremiumSoft\NavicatPremium\Update /v "LastCheckTime" /t REG_SZ /d 1 /f

rmdir /S /Q C:\Users\XXXX\Documents\Navicat
rmdir /S /Q C:\Users\XXXX\AppData\Local\Temp\NavicatCloud

echo\
echo\
echo 清除试用信息成功！
echo 请重新运行Navicat。
echo\
pause
exit


:checkDelCLSID
echo filtering %1
echo %1|findstr "{CAFEEFAC-" 1>nul 2>nul
set result=%errorlevel%
if %result%==0 goto:eof

echo checking %1
reg query %1\Info 1>nul 2>nul
set result=%errorlevel%
if %result%==1 goto:eof

echo deleteing %1
reg delete %1 /f 1>nul 2>nul

goto:eof


```


```
无限期每5分钟执行一次
schtasks /create /tn test_task /tr C:\wwwroot\hexo\gitpull.bat /sc  minute /mo 5  
```