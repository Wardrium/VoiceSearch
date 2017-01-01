// Generic voice commands accessible from all pages. Also starts Artyom.
artyom.addCommands([
    {
        indexes:["back", "forward"],
        action:function(cmd){
            if (cmd == 0){ // Back
                artyom.say("Going back a page.");
                nav.navigate_back(1);
            }
            else if (cmd == 1){ // Forward
                artyom.say("Going forward a page.");
                nav.navigate_forward(1);
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