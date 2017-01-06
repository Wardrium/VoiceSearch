var enabled_tabs = new Set();	// Set of id's of tabs that have voice commands enabled.

// Scripts required for all youtube pages.
var generic_content_scripts = ["jquery-3.1.1.slim.min.js", "artyom.min.js", "handlers/general.js"];
var home_content_scripts = ["handlers/home.js"];	// Home page
var video_content_scripts = ["handlers/video.js"];	// Watching video

// Enable voice commands on a specific tab
function enable(tab){
	chrome.browserAction.setIcon({tabId: tab.id, path: "icons/icon.png"});	// Change icon to non-gray version

	// Helper function for injecting scripts.
	function inject_scripts(scripts){
		for (var i = 0; i < scripts.length; ++i){
			chrome.tabs.executeScript(tab.id, {file: scripts[i]});
		}
	}

	inject_scripts(generic_content_scripts);	// Inject generic scripts

	// Inject page specific scripts
	var url = tab.url;
	if (url.match(/.*youtube\.com\/$/)){	// Home
		console.log('home');
		inject_scripts(home_content_scripts);
	}
	else if (url.match(/.*youtube\.com\/watch\?.*/)){	// Video
		console.log('video');
		inject_scripts(video_content_scripts);
	}
	else if (url.match(/.*youtube\.com\/results\?.*/)){	// Search results
		console.log('search');
		inject_scripts(home_content_scripts);	// Home search scripts also works for search results
	}
	else if (url.match(/.*youtube\.com\/user\/.*\/featured/) || url.match(/.*youtube\.com\/channel\/.*\/featured/)){	// Channel home
		console.log('channel home');
	}
	else if (url.match(/.*youtube\.com\/user\/.*\/videos/) || url.match(/.*youtube\.com\/channel\/.*\/videos/)){			// Channel videos
		console.log('channel videos');
	}
}

// Disable voice comamnds on a specific tab
function disable(tabId){
	if (enabled_tabs.has(tabId)){
		enabled_tabs.delete(tabId);
		chrome.browserAction.setIcon({tabId: tabId, path: "icons/icon_gray.png"});
		chrome.tabs.reload(tabId);	// Lazy way: Refresh page so scripts don't get injected again if user re-enables voice commands.
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
var onUpdatedListenerExists = false;	// To prevent from adding multiple onUpdated listeners.
chrome.webNavigation.onCommitted.addListener(function(details){
	if (details.transitionType != "auto_subframe"){		// Extra requests that user did not request for?
		if (details.url.match(/.*youtube.com\/.*/)){
			chrome.browserAction.enable(details.tabId);

			if (enabled_tabs.has(details.tabId)){
				enable({id: details.tabId, url: details.url});
			}
		}
		else {
			chrome.browserAction.disable(details.tabId);
			if (enabled_tabs.has(details.tabId)){
				enabled_tabs.delete(details.tabId);
			}
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

// If user closes tab, removes it from enabled_tabs
chrome.tabs.onRemoved.addListener(function(tabId){
	if (enabled_tabs.has(tabId)){
		enabled_tabs.delete(tabId);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender){
	if (request.shutdown){
		disable(sender.tab.id);
	}
});