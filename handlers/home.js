// YouTube homepage.
console.log('home.js runnning');

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["video *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0){  // Video
                artyom.say("Opening video " + index);
                nav.navigate_video(index);
            }
        }
    }
]);

// Navigation--------------------------------------------------------
var video_URLs = [];

nav.navigate_video = function(index){
    if (index == "zero")    // Artoym parses zero as a string instead of a number
        index = 0;
    window.location.href = video_URLs[index];
}

// DOM modification--------------------------------------------------
$(document).ready(function(){
    // Number the videos on the home page.
    var counter = 0;
    $(".yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link").each(function(){
        var name = $(this).text();
        $(this).html("<span style='color:red'>" + counter + ": </span>" + name);
        video_URLs.push($(this).attr('href'));
        counter += 1;
    });
});