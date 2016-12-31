document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('youtube').addEventListener('click', function(){
		chrome.tabs.update({
			url: "http://www.youtube.com/"
		});
	});
	document.getElementById('video').addEventListener('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {view_video: document.getElementById('video_index').value});
		});
	});
	document.getElementById('sidebar').addEventListener('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {view_sidebar: document.getElementById('sidebar_index').value});
		});
	});
})