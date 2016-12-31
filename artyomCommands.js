artyom.addCommands([
    {
        indexes:["hello", "hey"],
        action:function(i){
            if (i == 0){
                artyom.say("Hello! How are you?");
            }
        }
    }
]);

function startArtyom(){

    artyom.initialize({
        lang: "en-GB",
        continuous: false,
        debug: true,
        listen: true
    })
    artyom.say('initialized');
}

startArtyom();