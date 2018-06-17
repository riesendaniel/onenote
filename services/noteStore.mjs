// Set the configuration for your app
var firebase = require('firebase');

var config = {
    apiKey: "apiKey",
    authDomain: "riesen-168512.firebaseapp.com",
    databaseURL: "https://riesen-168512.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function getNoteData() {
    database.ref('/notes/').once('value').then(function(snapshot) {
        console.log(snapshot.val());
    });
}

module.exports =  getNoteData();