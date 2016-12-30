document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('youtube').addEventListener('click', function(){
		chrome.runtime.sendMessage({navigate: 'http://www.youtube.com'})
	});
})