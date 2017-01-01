// YouTube homepage.
console.log('home.js runnning');

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["video *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0){  // Video
                nav.navigate_video(index);
            }
        }
    }
]);

artyom.addCommands([
    {
        indexes:["video7"],
        action:function(cmd, index){
            if (cmd == 0){  // Video7. Artyom interprets video 7 as video7.
                nav.navigate_video(7);
            }
        }
    }
]);

// Navigation--------------------------------------------------------
var video_URLs = [];

nav.navigate_video = function(index){
    if (index == "zero")    // Artyom parses zero as a string instead of a number.
        index = 0;
    else if (index == "six" || index == "sex")    // Artyom parses six as a string instead of a number. Also mishears six as sex sometimes.
        index = 6;

    if (video_URLs[index]){
        window.location.href = video_URLs[index];
        artyom.say("Opening video " + index);
    }
    else{
        artyom.say("No video " + index);
    }
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