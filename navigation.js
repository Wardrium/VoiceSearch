// Index of each element = number it is visually assigned
var video_URLs = [];
var sidebar_URLs = [];

var page_type = {
	home: 0,
	search: 1,
	none: -1,
}

$(document).ready(function(){
	// Number the videos on the home page.
	var counter = 0;
	$(".yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link").each(function(){
		var name = $(this).text();
		$(this).html("<span style='color:red'>" + counter + ": </span>" + name);
		video_URLs.push($(this).attr('href'));
		counter += 1;
	});

	// Number the subscriptions on the sidebar.
	counter = 0;
	$(".guide-item.yt-uix-sessionlink.yt-valign.spf-link").each(function(){
		var name = $(this).text();
		$(this).html("<span style='color:red'>" + counter + ": </span>" + name);
		sidebar_URLs.push($(this).attr('href'));
		counter += 1;
	});
});

var nav = {
	// Returns what page on youtube user is at. 0 = home, 1 = search, -1 = none of the above
	get_page_type: function(){
		if ($(".home")[0]){
			return page_type.home;
		}
		else if ($(".search")[0]){
			return page_type.search;
		}
	},

	navigate_video: function(index){
		if (index == "zero")	// Artoym parses zero as a string instead of a number
			index = 0;
		window.location.href = video_URLs[index];
	},

	navigate_sidebar: function(index){
		window.location.href = sidebar_URLs[index];
	},

	navigate_back: function(index){
		window.history.go(-index);
	},

	navigate_forward: function(index){
		window.history.go(index);
	},

	pause_video: function(){
		$(".ytp-play-button.ytp-button").click();
	},

	resume_video: function(){
		$(".ytp-play-button.ytp-button").click();
	},
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.back)
			navigate_back(request.back);
		else if (request.forward)
			navigate_forward(request.forward);
		else if (request.view_video)
			navigate_video(request.view_video);
		else if (request.view_sidebar)
			navigate_sidebar(request.view_sidebar);
	}
);