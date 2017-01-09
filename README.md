# About
A chrome extension for using voice commands to navigate through YouTube, control video playback settings, and search text. Does not yet support navigation through all pages on YouTube, just the major ones. Uses Artyom.js library wrapper for voice recognition (https://sdkcarlos.github.io/sites/artyom.html)

## Installation
1. Unpack the files into a folder
2. Open Chrome and type "chrome://extensions/" into the URL bar.
3. Click load unpacked extensions and select the folder containing the files. Make sure Developer Mode is turned on.
4. Navigate to YouTube and click the application icon right of the URL bar. Activating the icon will enable voice commands for the active tab only.

## Available Voice Commands
Currently this application is not very user friendly. It was originally made for my personal use so I did not add any UI to instruct a user on the available voice commands. The available voice commands are documented below.

Note: Some commands take extra arguments. These are denoted with *.

**General Commands (Can be used anywhere on YouTube):**
* testing: Artyom will reply back with "working" if it can detect user's voice through mic.
* video *: Upon turning on extension, videos will be labeled with a number in front of them. By saying "video" followed by its number, the video will be opened.
* sidebar *: The links on the YouTube sidebar will also be labeled with numbers. By saying "sidebar" followed by a number, a link on the sidebar will be clicked. This will usually lead to a subscribed channel, although commands for channel pages are not implemented yet.
* shutdown: User will be prompted for "yes"/"no". If user replies with yes, then the extension will disable itself.
* art sleep: Artyom will stop taking commands from user until user says "art wake". Useful for talking to other people while extension is activated.
* back: Go backward a page
* forward: Go forward a page
* refresh: Refresh the page
* home: Go back to YouTube home page
* down: Scroll down
* up: Scroll up
* top: Scroll to top
* help: Displays available commands right below search bar. Does not look very good; I just added this quickly in case I forgot some commands.
* search: Enters search mode. Commands are detailed below.
    
**Search Mode Commands (Will type user input into YouTube search bar):**
    Upon first entering this mode, will be prompted for a mode. Respond with either "word" or "letter" to enter the respective mode. Only difference between the two modes is that in word mode, user input is seperated with spaces.
* cancel search: Exits search mode so general commands will work again.
* clear search: Clears search bar
* start search: Searches whatever is currently in the search box
* word mode: Switch to word mode, if currently in letter mode
* letter mode: Switch to letter mode, if currently in word mode
* undo that: Undos previous input action
* *: If user says anything that is not one of the above commands, what is said will be appended to the search box.
    
**Video Commands (Can be used to control video playback when watching a video):**
* pause, resume, play, rewind, skip, restart, lower volume, increase volume, mute, unmute, channel, subscribe, unsubscribe (self explainatory)
* rewind *, skip * can also be used to specify the number of seconds. rewind/skip without specifying the seconds will rewind/skip 5 seconds.