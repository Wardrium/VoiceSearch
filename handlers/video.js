// YouTube video.

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["paws", "pause", "resume"],
        action:function(cmd){
            if (cmd == 0 || cmd == 1){ // Pause. Artyom interprets my 'pause' as 'paws'.
                nav.pause_video();
            }
            else if (cmd == 2){ // Resume
                nav.resume_video();
            }
        }
    }
]);

// Navigation--------------------------------------------------------
nav.pause_video = function(){
    $(".ytp-play-button.ytp-button").click();
},

nav.resume_video: function(){
    $(".ytp-play-button.ytp-button").click();
},

// DOM modification--------------------------------------------------