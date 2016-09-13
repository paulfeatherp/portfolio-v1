(function (window) {
  console.log('TEST')

  function getID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function getSessionId() {
    if (localStorage && localStorage['sid'] && localStorage['sid'].length === 36) {
      return localStorage['sid'];
    }
    var sid = getID();
    localStorage['sid'] = sid;

    return sid;
  }

  window.sid = getSessionId();


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYmKRZSHTdyOe5_c68bXqu3lSheHvGFmA",
    authDomain: "blog-test-cb52d.firebaseapp.com",
    databaseURL: "https://blog-test-cb52d.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  function syncQuestions() {
    var nodes = document.getElementsByClassName('q-firebase-sync');

    for (var i = 0; i < nodes.length; i++) {
      console.log(nodes[i])
      nodes[i].addEventListener('input', syncQuestion)
    }
  }

  function syncQuestion(event) {
    event.stopPropagation();
    var data = this.id.split('-'),
      formId = data[0],
      questionId = data[1],
      questionLabel = this.getAttribute('data-q'),
      questionAnswer = this.value;
    console.log(this.id, this.value, questionLabel, questionAnswer);
    saveQuestion(formId, questionId, window.sid, questionLabel, questionAnswer)
  }

  function saveQuestion(formId, questionId, id, questionLabel, questionAnswer) {
    database.ref('forms/' + formId + '/questions/' + questionId + '/session/' + id).set({
      questionLabel: questionLabel,
      questionAnswer: questionAnswer,
    });
  }
  syncQuestions();
})(window)
