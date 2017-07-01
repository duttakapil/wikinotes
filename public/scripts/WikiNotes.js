'use strict';

function WikiNotes() {
    this.loggedOutPage = document.getElementById('logged-out-page');
    this.loggedInPage = document.getElementById('logged-in-page');
    this.signInButton = document.getElementById('sign-in');

    // Add event listeners
    this.signInButton.addEventListener('click', this.signIn.bind(this));

    this.initFirebase();
}

WikiNotes.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
    console.log('here1');
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
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

window.onload = function() {
  window.wikiNotes = new WikiNotes();
};