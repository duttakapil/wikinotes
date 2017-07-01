'use strict';

var position;

function WikiNotes() {
    this.loggedOutPage = document.getElementById('logged-out-page');
    this.loggedInPage = document.getElementById('logged-in-page');
    this.signInButton = document.getElementById('sign-in');

    this.msgContent = document.getElementById('msg-content');
    this.msgSubmitButton = document.getElementById('msg-button');

    // Add event listeners
    this.signInButton.addEventListener('click', this.signIn.bind(this));
    this.msgSubmitButton.addEventListener('click', this.sendMessageToFirebase.bind(this));

    this.initFirebase();
}

WikiNotes.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
    console.log('here1');
}

WikiNotes.prototype.sendMessageToFirebase = function() {
  console.log('Content', this.msgContent.value);
  console.log('Pos', this.position.lat());
  this.messagesRef = this.database.ref('messages/');
  // this.messagesRef.off();
  this.messagesRef.push({
    'content': this.msgContent.value,
    'position': {
      'lat': this.position.lat(),
      'lng': this.position.lng()
    } 
  }).then(function () {
    console.log('Written something');
    $("#modal-msg").modal('close');
  }).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });
}

WikiNotes.prototype.sendMessage = function(pos) {
  $("#modal-msg").modal('open');
  this.position = pos;
}

WikiNotes.prototype.onAuthStateChanged = function (user) {
  if (user) {
    this.loggedOutPage.setAttribute('hidden', 'true');
    this.loggedInPage.removeAttribute('hidden');
  } else {
    this.loggedInPage.setAttribute('hidden', 'true');
    this.loggedOutPage.removeAttribute('hidden');
  }
}

WikiNotes.prototype.initFirebase = function() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
}

window.onload = function() {
  window.wikiNotes = new WikiNotes();

};