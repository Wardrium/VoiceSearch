document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('youtube').addEventListener('click', function(){
		chrome.tabs.update({
			url: "http://www.youtube.com/"
		});
	});
	document.getElementById('first').addEventListener('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {view: '0'});
		});
	});
})