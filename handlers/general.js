/*
    This file is injected into all YouTube pages. Has generic functions and voice commands
    that can be used on any YouTube page. Also starts Artyom.
*/

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["testing", "shutdown", "artyom pause", "artyom resume", "back", "forward", "refresh"],
        action:function(cmd){
            if (cmd == 0){  // Testing
                artyom.say("Working");
            }
            else if (cmd == 1){ // Shutdown
                artyom.say("Shutting down");

            }
            else if (cmd == 2){ // Pause Artyom

            }
            else if (cmd == 3){ // Resume Artyom

            }
            else if (cmd == 4){ // Back
                nav.navigate_back(1);
            }
            else if (cmd == 5){ // Forward
                nav.navigate_forward(1);
            }
            else if (cmd == 6){ // Refresh
                nav.refresh();
            }
        }
    }
]);

// Smart commands: command + a variable
artyom.addCommands([
    {
        indexes:["sidebar *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0){  // Sidebar
                nav.navigate_sidebar(index);
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
    });
    artyom.say("Initialized");
}

startArtyom();

// Navigation--------------------------------------------------------
var sidebar_URLs = [];

var nav = {
    navigate_sidebar: function(index){
        artyom.say("Opening sidebar " + index);
        window.location.href = sidebar_URLs[index];
    },

    navigate_back: function(index){
        artyom.say("Going back a page.");
        window.history.go(-index);
    },

    navigate_forward: function(index){
        artyom.say("Going forward a page.");
        window.history.go(index);
    },

    refresh: function(){
        artyom.say("Refreshing page.");
        window.location.reload();
    },
}

// DOM modification--------------------------------------------------
function labelSidebar() {
    // Number the subscriptions on the sidebar.
    counter = 0;
    $(".display-name").each(function(){
        var name = $(this).text();
        var prefix = counter + ": ";
        // If name already starts with prefix, then prefix has already been added. Do not add again.
        if (name.substr(0, prefix.length) == prefix){
            name = name.substr(prefix.length);
        }
        $(this).html("<span style='color:red'>" + counter + ": </span>" + name);
        sidebar_URLs.push($(this).attr('href'));
        counter += 1;
    });
}

labelSidebar();