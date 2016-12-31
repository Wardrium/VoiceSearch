var page = nav.get_page_type();

// Smart commands: command + a variable
artyom.addCommands([
    {
        indexes:["video *", "sidebar *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0){  // Video
                artyom.say("Opening video " + index);
                nav.navigate_video(index);
            }
            else if (cmd == 1){  // Sidebar
                artyom.say("Opening sidebar " + index);
                nav.navigate_sidebar(index);
            }
        }
    }
]);

// Normal command: no variable
artyom.addCommands([
    {
        indexes:["back", "forward", "paws", "pause", "resume"],
        action:function(cmd){
            if (cmd == 0){ // Back
                artyom.say("Going back a page.");
                nav.navigate_back(1);
            }
            else if (cmd == 1){ // Forward
                artyom.say("Going forward a page.");
                nav.navigate_forward(1);
            }
            else if (cmd == 2 || cmd == 3){ // Pause. Artyom interprets my 'pause' as 'paws'.
                nav.pause_video();
            }
            else if (cmd == 4){ // Resume
                nav.resume_video();
            }
        }
    }
]);

function startArtyom(){
    artyom.initialize({
        lang: "en-GB",
        continuous: true,
        debug: true,
        listen: true
    })
}

startArtyom();