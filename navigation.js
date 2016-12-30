function navigate(URL){
	chrome.tabs.update({
		url: "http://www.youtube.com/"
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		navigate(request.navigate);
	}
);