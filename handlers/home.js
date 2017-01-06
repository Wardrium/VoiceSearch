// YouTube homepage.

// DOM modification--------------------------------------------------
$(document).ready(function(){
    // Number the videos on the home page.
    var counter = 0;
    $(".yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link").each(function(){
        var url = $(this).attr('href');
        if (url){
            var name = $(this).text();
            $(this).html("<span style='color:red'>" + counter + ": </span>" + name);
            video_URLs.push(url);
            counter += 1;
        }
    });
});