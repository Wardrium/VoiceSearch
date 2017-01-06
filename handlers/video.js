// YouTube video.

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["paws", "pause", "resume", "play", "rewind", "skip", "restart", "lower volume", "increase volume", "mute", "unmute"],
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
                vid.mute_video();
            }
            else if (cmd == 10){ // Unmute volume
                vid.unmute_video();
            }
        }
    }
]);

artyom.addCommands([
    {
        indexes:["rewind *", "remind *", "skip *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0, 1){  // rewind. Sometimes artyom interprets rewind as remind.
                if (Number(index)){ // insure index is a number
                    artyom.say("Rewinding " + index + " seconds")
                    vid.set_timer(nav.get_timer() - index);
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

// Navigation--------------------------------------------------------
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

// DOM modification--------------------------------------------------