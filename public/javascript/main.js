
var eb;
var retryCount = 10;

// Support dynamic topic registration by #word
var urlHashTopic = location.hash ? location.hash.substring(1).toLowerCase() : null;
var topic = urlHashTopic ? urlHashTopic : "main";

function initialiseEventBus(){
    eb = new vertx.EventBus("http://localhost:8080/chat");

    eb.onopen = function () {
        subscribe(topic);
    };

    eb.onclose = function(){
        if (retryCount) {
            retryCount--;
            console.log('Connection lost, scheduling reconnect');
            setTimeout(initialiseEventBus, 1000);
        } else{
            Materialize.toast('Connection lost, please refresh :( ', 10000);
        }
    };
}

function sendMessage(topic, input) {
    if (input.val()) {
        publish(topic, input.val());
        input.val('');
    }
}

function publish(address, message) {
    if (eb) {
        var json = createMessage(message);
        eb.publish(address, json);
    }
}

function subscribe(address) {
    if (eb) {
        eb.registerHandler(address, function (msg) {
            if (msg.newSessionId) {
                retryCount = 5;
                mySessionId = msg.newSessionId;
                publish(topic,""); // Sending a first empty message
            } else {
                displayMessageOnMap(msg);
            }
        });
    }
}

$( document ).ready(function() {
});
