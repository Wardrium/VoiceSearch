var enabled_tabs = new Set();	// Set of id's of tabs that have voice commands enabled.

// Scripts required for all youtube pages.
var generic_content_scripts = ["jquery-3.1.1.slim.min.js", "artyom.min.js", "navigation.js", "generalArtyomCommands.js"];
var home_content_scripts = ["homeArtyomCommands.js"];	// Home page
var video_content_scripts = ["videoArtyomCommands.js"];	// Watching video

// Enable voice commands on a specific tab
function enable(tab){
	chrome.browserAction.setIcon({tabId: tab.id, path: "icons/icon.png"});	// Change icon to non-gray version

	// Inject generic scripts
	for (var i = 0; i < generic_content_scripts.length; ++i){
		chrome.tabs.executeScript(tab.id, {file: generic_content_scripts[i]});
	}

	// Inject scripts based on what page of youtube the user is on
	var url = tab.url;
	console.log(url);
	if (url.match(/.*youtube\.com\/$/)){	// Home
		console.log('home');
	}
	else if (url.match(/.*youtube\.com\/watch\?.*/)){	// Video
		console.log('video');
	}
	else if (url.match(/.*youtube\.com\/user\/.*\/featured/) || url.match(/.*youtube\.com\/channel\/.*\/featured/)){	// Channel home
		console.log('channel home');
	}
	else if (url.match(/.*youtube\.com\/user\/.*\/videos/) || url.match(/.*youtube\.com\/channel\/.*\/videos/)){			// Channel videos
		console.log('channel videos');
	}
}

// Check if user is on youtube. If user is not on youtube, then disable this extension.
chrome.tabs.query({}, function(tabs){
	for (var i = 0; i < tabs.length; ++i){
		if (tabs[i].url.match(/.*youtube.com\/.*/)){
			chrome.browserAction.enable(tabs[i].id);
		}
		else {
			chrome.browserAction.disable(tabs[i].id);
		}
	}
});

// If the user changes pages, check new URL to see whether to enable or disable voice commands.
chrome.webNavigation.onCommitted.addListener(function(details){
	if (details.transitionType != "auto_subframe"){		// Extra requests that user did not request for?
		if (details.url.match(/.*youtube.com\/.*/)){
			chrome.browserAction.enable(details.tabId);
			if (enabled_tabs.has(details.tabId)){
				enable({id: details.tabId, url: details.url});
			}

			// Add listener for when user navigates between youtube pages.
			chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
				if (changeInfo.title){	// Title seems to be only one that shows up once upon navigation/refresh/back/forward.
					if (enabled_tabs.has(tabID)){
						enable(tab);
					}
				}
			});
		}
		else {
			chrome.browserAction.disable(details.tabId);

			// Remove listener added for when user navigates between youtube pages.
			chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
				chrome.tabs.onUpdated.removeListener(arguments.callee);
			});
		}
	}
});

// Clicking the icon enables voice commands.
chrome.browserAction.onClicked.addListener(function(tab){
	if (!enabled_tabs.has(tab.id)){
		enabled_tabs.add(tab.id);	// Add id of tab in.
		enable(tab);
	}
});