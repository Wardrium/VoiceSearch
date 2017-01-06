// YouTube video.

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["paws", "pause", "resume", "play", "rewind", "skip", "restart", "lower volume", "increase volume", "mute", "unmute", "channel", "subscribe", "unsubscribe"],
        action:function(cmd){
            if (cmd == 0 || cmd == 1){ // Pause. Artyom interprets my 'pause' as 'paws'.
                artyom.say("Pausing video");
                vid.pause_video();
            }
            else if (cmd == 2 || cmd == 3){ // Resume/play
                artyom.say("Resuming video");
                vid.resume_video();
            }
            else if (cmd == 4){ // Rewind 5 seconds
                artyom.say("Rewinding 10 seconds");
                vid.set_timer(nav.get_timer() - 10);
            }
            else if (cmd == 5){ // Skip 5 seconds
                artyom.say("Skipping 10 seconds");
                vid.set_timer(nav.get_timer() + 10);
            }
            else if (cmd == 6){ // Restart video
                artyom.say("Restarting video");
                vid.set_timer(0);
            }
            else if (cmd == 7){ // Lower volume
                vid.change_volume(-0.2);
            }
            else if (cmd == 8){ // Increase volume
                vid.change_volume(0.2);
            }
            else if (cmd == 9){ // Mute volume
                artyom.say("Muting sound");
                vid.mute_video();
            }
            else if (cmd == 10){ // Unmute volume
                artyom.say("Unmuting sound");
                vid.unmute_video();
            }
            else if (cmd == 11){ // Go to video owner's channel
                artyom.say("Going to channel");
                nav.view_channel();
            }
            else if (cmd == 12){ // Subscribe to video owner
                artyom.say("Subscribing");
                nav.subscribe();
            }
            else if (cmd == 13){ // Unsubscribe to video owner
                artyom.say("Unsubscribing");
                nav.unsubscribe();
            }
        }
    }
]);

artyom.addCommands([
    {
        indexes:["rewind *", "remind *", "skip *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0 || cmd == 1){  // rewind. Sometimes artyom interprets rewind as remind.
                if (Number(index)){ // insure index is a number
                    artyom.say("Rewinding " + index + " seconds")
                    vid.set_timer(vid.get_timer() - index);
                }
                else {
                    artyom.say("Did not understand rewind command")
                }
            }
            else if (cmd == 2){ // skip
                if (Number(index)){
                    artyom.say("Skipping " + index + " seconds")
                    vid.set_timer(vid.get_timer() + index);
                }
                else {
                    artyom.say("Did not understand skip command")
                }
            }
        }
    }
]);

page_commands = ["pause", "resume", "play", "rewind", "skip", "rewind *", "skip *", "restart", "lower volume", "increase volume", "mute", "unmute", "channel", "subscribe", "unsubscribe"];

// Video Playback----------------------------------------------------
var video = $("video")[0];
vid = {};

vid.pause_video = function(){
    video.pause();
}

vid.resume_video = function(){
    video.play();
}

vid.set_timer = function(newTime){
    video.pause();
    video.currentTime = newTime;
    video.play();
}

vid.get_timer = function(){
    return video.currentTime;
}

vid.change_volume = function(vol){
    var new_vol = video.volume + vol;
    if (new_vol > 1)
        new_vol = 1;
    if (new_vol < 0)
        new_vol = 0;
    video.volume = new_vol;
}

vid.mute_video = function(){
    video.muted = true;
}

vid.unmute_video = function(){
    video.muted = false;
}

// Navigation--------------------------------------------------------
var video_URLs = [];

nav.navigate_video = function(index){
    if (video_URLs[index]){
        window.location.href = video_URLs[index];
        return true;
    }
    else{
        return false;
    }
}

// Go to video owner's channel
nav.view_channel = function(){
    window.location.href = $(".yt-user-photo.yt-uix-sessionlink.g-hovercard.spf-link").attr('href');
}

nav.subscribe = function(){
    $(".yt-uix-button-subscribe-branded").click();
}

nav.unsubscribe = function(){
    $(".yt-uix-button-subscribed-branded").click();
}

// DOM modification--------------------------------------------------
$(document).ready(function(){
    // Number the videos on the home page.
    var counter = 0;   // Start at -2 because there are two elemetns with title ID that are not video links.
    $(".title").each(function(){
        var url = $(this).parent().attr('href');
        if (url){
            var name = $(this).text();
            $(this).html("<span style='color:red'>" + counter + ": </span>" + name);
            video_URLs.push(url);
            counter += 1;
        }
    });
});