// Voice commands usable on homepage.

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