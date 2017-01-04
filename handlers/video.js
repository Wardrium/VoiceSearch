// YouTube video.

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["paws", "pause", "resume", "play", "rewind", "skip", "restart", "lower volume", "increase volume"],
        action:function(cmd){
            if (cmd == 0 || cmd == 1){ // Pause. Artyom interprets my 'pause' as 'paws'.
                artyom.say("Pausing video");
                nav.pause_video();
            }
            else if (cmd == 2 || cmd == 3){ // Resume/play
                artyom.say("Resuming video");
                nav.resume_video();
            }
            else if (cmd == 4){ // Rewind 5 seconds
                artyom.say("Rewinding 10 seconds");
                nav.set_timer(nav.get_timer() - 10);
            }
            else if (cmd == 5){ // Skip 5 seconds
                artyom.say("Skipping 10 seconds");
                nav.set_timer(nav.get_timer() + 10);
            }
            else if (cmd == 6){ // Restart video
                artyom.say("Restarting video");
                nav.set_timer(0);
            }
            else if (cmd == 7){

            }
            else if (cmd == 8){
                
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
                    nav.set_timer(nav.get_timer() - index);
                }
                else {
                    artyom.say("Did not understand rewind command")
                }
            }
            else if (cmd == 2){ // skip
                if (Number(index)){
                    artyom.say("Skipping " + index + " seconds")
                    nav.set_timer(nav.get_timer() + index);
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

nav.pause_video = function(){
    video.pause();
}

nav.resume_video = function(){
    video.play();
}

nav.set_timer = function(newTime){
    video.pause();
    video.currentTime = newTime;
    video.play();
}

nav.get_timer = function(){
    return video.currentTime;
}

// DOM modification--------------------------------------------------