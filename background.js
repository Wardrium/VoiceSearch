var content_scripts = ["jquery-3.1.1.slim.min.js", "artyom.min.js", "navigation.js", "artyomCommands.js"];

// Enable voice commands on a specific tab
function enable(tabID){
	chrome.browserAction.setIcon({tabId: tabID, path: "icons/icon.png"});	// Change icon to non-gray version

	// Inject content scripts
	for (var i = 0; i < content_scripts.length; ++i){
		chrome.tabs.executeScript(tabID, {file: content_scripts[i]});
	}
}

// Check if user is on youtube. If user is not on youtube, then disable this extension.
chrome.tabs.query({}, function(tabs){
	for (var i = 0; i < tabs.length; ++i){
		if (tabs[i].url.match(/youtube.com/)){
			chrome.browserAction.enable(tabs[i].id);
		}
		else {
			chrome.browserAction.disable(tabs[i].id);
		}
	}
});

// If the user changes pages, check new URL to see whether to enable or disable voice commands.
chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	if (changeInfo.url){
		if (changeInfo.url.match(/youtube.com/)){
			chrome.browserAction.enable(tabID);
		}
		else {
			chrome.browserAction.disable(tabID);
		}
	}
});

// Clicking the icon enables voice commands.
chrome.browserAction.onClicked.addListener(function(tab){
	enable(tab.id);
});