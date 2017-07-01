function initMap() {
var uluru = {lat: -25.363, lng: 131.044};
var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 3,
    center: uluru
});
var database = firebase.database();
var messagesRef = database.ref('messages/');


messagesRef.on('child_added', function(data) {
    console.log(data.val().text);
    var marker = placeMarker(data.val().position);
    console.log(marker);
    var infowindow = new google.maps.InfoWindow({
        content: data.val().content
    });
    marker.addListener('click', function() {
        infowindow.open(map, this);
    })
});

// contentString = '<div id="content">'+
//     '<div id="siteNotice">'+
//     '</div>'+
//     '<h3 id="firstHeading" class="firstHeading">What\'s happening</h3>'+
//     '<div id="bodyContent">'+
//     '<textarea id="msg-content" name="message-content" rows="7" cols="50" placeholder="Tell us what\'s happening here">'+
//     '</textarea>'+
//     '<button id="msg-submit" class="btn waves-effect waves-light" style="margin-top: 20px;">Submit' +
//     '<i class="material-icons right">send</i>'+
//     '</button>' +
//     '</div>'+
//     '</div>';

google.maps.event.addListener(map, 'click', function(event){
    console.log('map clicked', event);
    var marker = placeMarker(event.latLng);
    window.wikiNotes.sendMessage(marker.position);
});

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    return marker;
}


}