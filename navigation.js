// Index of each element = number it is visually assigned
var video_URLs = [];
var sidebar_URLs = [];

$(document).ready(function(){
	// Number the videos on the home page.
	var counter = 0;
	$(".yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link").each(function(){
		var name = $(this).text();
		$(this).text(counter + ': ' + name);
		video_URLs.push($(this).attr('href'));
		counter += 1;
	});

	// Number the subscriptions on the sidebar.
	counter = 0;
	$(".guide-item.yt-uix-sessionlink.yt-valign.spf-link").each(function(){
		var name = $(this).text();
		$(this).text(counter + ': ' + name);
		sidebar_URLs.push($(this).attr('href'));
		counter += 1;
	});
});

// Returns what page on youtube user is at. 0 = home, 1 = search, -1 = none of the above
function get_page(){

}

function navigate_video(index){
	window.location.href = video_URLs[index];
}

function navigate_sidebar(index){
	window.location.href = sidebar_URLs[index];
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.view_video)
			navigate_video(request.view_video);
		else if (request.view_sidebar)
			navigate_sidebar(request.view_sidebar);
	}
);