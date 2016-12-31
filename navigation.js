// Returns what page on youtube user is at. 0 = home, 1 = search, -1 = none of the above
function get_page(){
	
}

function view_video(index){
	var link = document.getElementsByClassName(" yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink       spf-link ");
	link[index].click();
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		view_video(request.view);
	}
);