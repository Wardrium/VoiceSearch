var URLs = [];	// Array of URLs for navigation.

$(document).ready(function(){
	var counter = 0;
	$(".yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link").each(function(){
		var name = $(this).text();
		$(this).text(counter + ': ' + name);
		URLs.push($(this).attr('href'));
		counter += 1;
	});
});

// Returns what page on youtube user is at. 0 = home, 1 = search, -1 = none of the above
function get_page(){

}

function view_video(index){
	window.location.href = URLs[index];
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		view_video(request.view);
	}
);