/*
    This file is injected into all YouTube pages. Has generic functions and voice commands
    that can be used on any YouTube page. Also starts Artyom.
*/

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["testing", "video7", "shutdown", "art sleep", "back", "forward", "refresh", "home", "search", "down", "up", "top", "help"],
        action:function(cmd){
            if (cmd == 0){  // Testing
                artyom.say("Working");
            }
            else if (cmd == 1){ // Video7. Artyom interprets video 7 as video7.
                var success = nav.navigate_video(7);
                if (success)
                    artyom.say("Opening video 7");
                else
                    artyom.say("No video 7");
            }
            else if (cmd == 2){ // Shutdown
                artyom.newPrompt({
                    question: "Are you sure?",
                    options: ["yes", "no"],
                    onMatch: function(res){
                        var action;
                        if (res == 0){   // yes
                            action = function(){
                                artyom.say("Shutting down...", {onEnd: function(){
                                    stopArtyom();
                                }});
                            }
                        }
                        else if (res == 1){ //no
                            action = function(){
                                artyom.say("Shutdown canceled");
                            }
                        }
                        return action;
                    }
                });
            }
            else if (cmd == 3){ // Sleep: stop taking commands until wake. art b/c artyom is hard to say.
                artyom.newPrompt({
                    question: "Sleeping...",
                    options: ["art wake", "hartwick", "heartbreak", "art way", "earthquake"],   // All words artyom mishears 'art wake' as
                    onMatch: function(res){
                        return action = function(){
                            artyom.say("Waking");
                        }
                    }
                });
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
            else if (cmd == 8){ // Search
                sch.start_search();
            }
            else if (cmd == 9){ // Scroll down
                nav.scroll_down();
            }
            else if (cmd == 10){ // Scroll up
                nav.scroll_up();
            }
            else if (cmd == 11){ // Scroll to top
                nav.scroll_top();
            }
            else if (cmd == 12){ // Show commands
                showCommands();
            }
        }
    }
]);

// Smart commands: command + a variable
artyom.addCommands([
    {
        indexes:["video *", "sidebar *"],
        smart: true,
        action:function(cmd, index){
            if (cmd == 0){  // Video
                if (index == "zero")    // Artyom parses zero as a string instead of a number.
                    index = 0;
                else if (index == "six" || index == "sex")    // Artyom parses six as a string instead of a number. Also mishears six as sex sometimes.
                    index = 6;

                var success = nav.navigate_video(index);
                if (success)
                    artyom.say("Opening video " + index);
                else
                    artyom.say("No video " + index);
            }
            if (cmd == 1){  // Sidebar
                artyom.say("Opening sidebar " + index);
                nav.navigate_sidebar(index);
            }
        }
    }
]);

function startArtyom(){
    artyom.initialize({
        mode: "normal",
        lang: "en-GB",
        continuous: true,
        debug: true,
        listen: true
    });
}

function stopArtyom(){
    artyom.fatality();
    chrome.runtime.sendMessage({shutdown: true});   // Alert background.js that voice commands were shut down.
}


// Show voice commands
var commands_showing = false;
var general_commands = ["testing", "video *", "sidebar *", "shutdown", "art sleep", "back", "forward", "refresh", "home", "search", "down", "up", "top", "help"];  // Name of generic commands to display to user
var page_commands = [];     // Name of page specific commands to display to user

function showCommands(){
    if (!commands_showing){
        if (general_commands.length > 0){
            var general = "General commands: ";
            for (var i = 0; i < general_commands.length; ++i){
                general = general + general_commands[i];
                if (i < general_commands.length - 1)
                    general = general + ", ";   // If not last command in list, add comma and space
            }
            $("#yt-masthead-content").append("<p>" + general + "</p>");
        }

        if (page_commands.length > 0){
            var page = "Page specific commands: ";
            for (var i = 0; i < page_commands.length; ++i){
                page = page + page_commands[i];
                if (i < page_commands.length - 1)
                    page = page + ", ";   // If not last command in list, add comma and space
            }
            $("#yt-masthead-content").append("<p>" + page + "</p>");
        }

        commands_showing = true;
    }
}

startArtyom();

// Navigation--------------------------------------------------------
var video_URLs = [];
var sidebar_URLs = [];

var nav = {
    // Go back to YouTube home
    navigate_home: function(){
        window.location.href = "https://www.youtube.com/";
    },

    // Go to video index in video_URLs.
    navigate_video: function(index){
        if (video_URLs[index]){
            window.location.href = video_URLs[index];
            return true;
        }
        else{
            return false;
        }
    },

    // Navigate via the YouTube dropdown sidebar
    navigate_sidebar: function(index){
        window.location.href = sidebar_URLs[index];
    },

    // Go forward a page
    navigate_back: function(index){
        window.history.go(-index);
    },

    // Go back a page
    navigate_forward: function(index){
        window.history.go(index);
    },

    // Refresh page
    refresh: function(){
        window.location.reload();
    },

    // Scroll down
    scroll_down: function(){
        window.scrollBy(0, 500);
    },

    // Scroll up
    scroll_up: function(){
        window.scrollBy(0, -500);
    },

    // Scroll to top
    scroll_top: function(){
        window.scrollTo(0, 0);
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

// Search------------------------------------------------------------
var search_field = $("#masthead-search-term");
var search_history = [];   // Lazy way of undo-ing search changes. Just push copy of search_field's value into this each time it's modified.

var sch = {
    // Start a search prompt.
    start_search: function(){
        artyom.newPrompt({
            question: "What mode would you like to search in?",
            options: ["word", "letter", "ward"],    // Word mode: type words the user says into search bar. Letter mode: types letters.
            onMatch: function(res){
                if (res == 2)   // Artyom misinterprets word as ward sometimes
                    res = 0;
                return action = function(){
                    sch._start_search(res);
                }
            }
        });
    },

    // Helper function to start_search. If mode == 0, word mode. If mode == 1, letter mode.
    _start_search: function(mode){
        if (mode == 0)
            question = "Word mode";
        else if (mode == 1)
            question = "Letter mode";
        artyom.newPrompt({
            question: question,
            smart: true,
            options: ["*"],
            onMatch: function(i, res){
                var action;

                if (res.indexOf("cancel search") != -1){    // Cancel search
                    action = function(){
                        artyom.say("Canceling search");
                    }
                }
                else if (res.indexOf("clear search") != -1){    // Clear search
                    action = function(){
                        sch._clear_search();
                        sch._start_search(mode);
                    }
                }
                else if (res.indexOf("start search") != -1){ // Search given text
                    action = function(){
                        artyom.say("Searching " + search_field.val());
                        sch._submit_search();
                    }
                }
                else if (res.indexOf("word mode") != -1){ // Search with word mode
                    action = function(){
                        sch._start_search(0);
                    }
                }
                else if (res.indexOf("letter mode") != -1){ // Search with letter mode
                    action = function(){
                        sch._start_search(1);
                    }
                }
                else if (res.indexOf("undo that") != -1){ // Undo previous action.
                    action = function(){
                        sch._undo_action();
                        sch._start_search(mode);
                    }
                }
                else {   // Add given text
                    action = function(){
                        sch._append_search(res, mode);
                        sch._start_search(mode);
                    }
                }
                return action;
            }
        });
    },

    // Clear the text in the search input field.
    _clear_search: function(){
        search_history.push(search_field.val());
        search_field.val('');
    },

    // Submit the search request.
    _submit_search: function(){
        $("#masthead-search").submit();
    },

    // Add text onto the search input field. If mode == 0, then add a space between current text and new text.
    _append_search: function(text, mode){
        search_history.push(search_field.val());
        if (mode == 0){
            if (search_field.val().length > 0)  // Only add space if search box is not empty yet.
                search_field.val(search_field.val() + " " + text);
            else
                search_field.val(search_field.val() + text);
        }
        else {
            search_field.val(search_field.val() + text);
        }
    },

    // Undos the previous action.
    _undo_action: function(){
        if (search_history.length > 0){
            search_field.val(search_history[search_history.length - 1]);
            search_history.pop();
        }
    }
}