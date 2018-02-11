# MPR1


Problems with local storage on Windows with IE:
1) I you are having issues with web sites using the LocalStorage feature on Windows with IE. When accessing app with the F12 Developer Tools open, a SCRIPT5: Access is denied message appeares on the console.
The cause is a problem with the settings on the C:\Users\username\Appdata\LocalLow folder in your user profile.
Each folder on your computer has an integrity setting. More information about the purpose of this setting is here: http://msdn.microsoft.com/en-us/library/bb625964.aspx
The integrity setting on the AppData\LocalLow folder (and its subfolders) in each user's profile is supposed to be set to "Low" (hence the name). In case of problems, chekc the integrity level is set correctly on this folder. To rectify the problem, run the following command in a command prompt window:
icacls %userprofile%\Appdata\LocalLow /t /setintegritylevel (OI)(CI)L

2) If you are testing this on a local HTML file, i.e. a file:/// URL, then try to run it with local web server.
localStorage is only available on HTTP websites.