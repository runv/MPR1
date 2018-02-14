# MPR1
## Installing

To run the application locally open index.html in browser.

## User manual:

Draw Rectangle Button: Draws a rectangle with a radial gradient fill at a random location & size drawing area. 
 
Draw Circle Button: Draws a circle of a random radius with a solid fill color at a random location within the drawing area. 

Save Image Button: Saves the contents of the drawing section to a persistent repository allowing the user to specify a name. Name is specified in the input field.
After image is saved successfully the dialog is shown. 

Load Image Button: Loads the contents of an image from the repository into the drawing area. 
To load specific image write name in the input field. If the image with the given name does not exist or name is not valid dialog will be shown.

Clear content Button: Clears drawing area.

Checkbox is to clear the current content of the drawing area when loading an image. 

Rectangle and circle changes opacity on mouse hover. 

Shapes are selectable on click

You can move a shape after the shape is selected 



## Problems with local storage on Windows with IE:
1) I you are having issues with web sites using the LocalStorage feature on Windows with IE. When accessing app with the F12 Developer Tools open, a SCRIPT5: Access is denied message appeares on the console.
The cause is a problem with the settings on the C:\Users\username\Appdata\LocalLow folder in your user profile.
Each folder on your computer has an integrity setting. More information about the purpose of this setting is here: http://msdn.microsoft.com/en-us/library/bb625964.aspx
The integrity setting on the AppData\LocalLow folder (and its subfolders) in each user's profile is supposed to be set to "Low" (hence the name). In case of problems, check the integrity level is set correctly on this folder. To rectify the problem, run the following command in a command prompt window:
icacls %userprofile%\Appdata\LocalLow /t /setintegritylevel (OI)(CI)L

2) If you are testing this on a local HTML file, i.e. a file:/// URL, then try to run it with local web server.
localStorage is only available on HTTP websites.