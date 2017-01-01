/*
    This file is injected into all YouTube pages. Has generic functions and voice commands
    that can be used on any YouTube page. Also starts Artyom.
*/

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["testing", "shutdown", "sleep", "wake", "back", "forward", "refresh", "home"],
        action:function(cmd){
            if (cmd == 0){  // Testing
                artyom.say("Working");
            }
            else if (cmd == 1){ // Shutdown
                artyom.say("Shutting down");
            }
            else if (cmd == 2){ // Sleep: stop taking commands until wake
                artyom.say("Sleeping...")
            }
            else if (cmd == 3){ // Wake: start taking commands
                artyom.say("Waking...")
            }
            else if (cmd == 4){ // Back
                artyom.say("Going back a page.");
                nav.navigate_back(1);
            }
            else if (cmd == 5){ // Forward
                artyom.say("Going forward a page.");
                nav.navigate_forward(1);
            }
            else if (cmd == 6){ // Refresh
                artyom.say("Refreshing page.");
                nav.refresh();
            }
            else if (cmd == 7){ // Home
                artyom.say("Rerouting home.");
                nav.navigate_home();
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
                artyom.say("Opening sidebar " + index);
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
}

startArtyom();

// Navigation--------------------------------------------------------
var sidebar_URLs = [];

var nav = {
    navigate_home: function(){
        window.location.href = "https://www.youtube.com/";
    },

    navigate_sidebar: function(index){
        window.location.href = sidebar_URLs[index];
    },

    navigate_back: function(index){
        window.history.go(-index);
    },

    navigate_forward: function(index){
        window.history.go(index);
    },

    refresh: function(){
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
        sidebar_URLs.push($(this).parent().parent().attr('href'));
        counter += 1;
    });
}

labelSidebar();