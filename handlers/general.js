/*
    This file is injected into all YouTube pages. Has generic functions and voice commands
    that can be used on any YouTube page. Also starts Artyom.
*/

// Voice Commands----------------------------------------------------
artyom.addCommands([
    {
        indexes:["testing", "shutdown", "art sleep", "back", "forward", "refresh", "home", "search"],
        action:function(cmd){
            if (cmd == 0){  // Testing
                artyom.say("Working");
            }
            else if (cmd == 1){ // Shutdown
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
            else if (cmd == 2){ // Sleep: stop taking commands until wake. art b/c artyom is hard to say.
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
            else if (cmd == 3){ // Back
                artyom.say("Going back a page.");
                nav.navigate_back(1);
            }
            else if (cmd == 4){ // Forward
                artyom.say("Going forward a page.");
                nav.navigate_forward(1);
            }
            else if (cmd == 5){ // Refresh
                artyom.say("Refreshing page.");
                nav.refresh();
            }
            else if (cmd == 6){ // Home
                artyom.say("Rerouting home.");
                nav.navigate_home();
            }
            else if (cmd == 7){ // Search
                sch.start_search();
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

startArtyom();

// Navigation--------------------------------------------------------
var sidebar_URLs = [];

var nav = {
    // Go back to YouTube home
    navigate_home: function(){
        window.location.href = "https://www.youtube.com/";
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

var sch = {
    // Start a search prompt.
    start_search: function(){
        artyom.newPrompt({
            question: "What mode would you like to search in?",
            options: ["word", "letter"],    // Word mode: type words the user says into search bar. Letter mode: types letters.
            onMatch: function(res){
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
            options: ["*", "cancel", "search", "word", "letter", "edit"],
            onMatch: function(res, search_str){
                if (res == 0){
                    sch._append_search(search_str, mode);
                    sch._start_search(mode);
                }
                else if (res == 1){ // Cancel search
                    sch._clear_search();
                }
                else if (res == 2){ // Search what is currently in search box
                    $("#masthead-search").submit();
                }
                else if (res == 3 || res == 4){
                    sch._start_search(res);
                }
                else if (res == 5){ // Edit errors that Artyom made
                    sch._modify_search();
                }
            }
        });
    },

    _modify_search: function(){
        
    },

    // Clear the text in the search input field.
    _clear_search: function(){
        search_field.val('');
    },

    // Add text onto the search input field. If mode == 0, then add a space between current text and new text.
    _append_search: function(text, mode){
        if (mode == true){
            if (search_field.val().length > 0)  // Only add space if search box is not empty yet.
                search_field.val(search_field.val() + " " + text);
            else
                search_field.val(search_field.val() + text);
        }
        else {
            search_field.val(search_field.val() + text);
        }
    },

    // Remove the last word in the search box.
    _remove_word_search: function(index){
        var space_index = search_field.val().lastIndexOf(" ");
        search_field.val(search_field.val().substring(0, space_index));
    },

    // Remove the last character in the text serach input field
    _remove_character_search: function(){
        search_field.val(search_field.val().substring(0, search_field.val().length - 1));
    }
}