// Voice commands usable while watching a video.

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