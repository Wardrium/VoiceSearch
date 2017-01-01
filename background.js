var enabled;	// Should this extension be enabled on youtube.
// Enable/disable usage on youtube. Note: this is not the same as chrome.browserAction.enable/disable.
// The chrome.browserAction is always enabled on youtube, and disabled everywhere else.
// If enabled is set to true while on youtube, then voice commands is activated. Otherwise, voice commands are disabled.
function enable(){
	enabled = true;
	chrome.browserAction.setIcon({path: "icons/icon.png"});
}
function disable(){
	enabled = false;
	chrome.browserAction.setIcon({path: "icons/icon_gray.png"});
}

// Load prexisting value of enabled (so if user disables it, it says disabled between sessions)
chrome.storage.local.get('enabled', function(items){
	if (items.enabled == null){
		enable();
	}
	else{
		enabled = items.enabled;
		if (enabled)
			enable();
		else
			disable();
	}
});

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
	if (changeInfo.url.match(/youtube.com/)){
		chrome.browserAction.enable(tabID);
	}
	else {
		chrome.browserAction.disable(tabID);
	}
});

// Clicking the icon enables/disables the voice commands.
chrome.browserAction.onClicked.addListener(function(){
	if (enabled)
		disable();
	else
		enable();
	chrome.storage.local.set({'enabled': enabled});
});

