var panel = $('#quiz-area');

//button to start and submit
$(document).on('click', '#start', function () {
  var snd = new Audio("assets/sounds/good-bad-ugly-theme.mp3");
  snd.play();
  snd.currentTime = 0;

  game.start();
});

$(document).on('click', '#done', function () {
  game.done();
});

//Trivia Questions and Answers 
var questions = [{
  question: "1. What is Billy the Kid's real name?",
  answers: ["William Henry McCarty ", "William Wilson ", "William Henry Pinkerton "],
  correctAnswer: "William Henry McCarty "
}, {
  question: "2. What Arizona lawman bacame an outlaw in the early 1900's",
  answers: ["Wyatt Earp ", "Burton Alvord ", "Seth Bullock"],
  correctAnswer: "Burton Alvord "
}, {
  question: "3. Who was not at the shoutout at the OK Corale?",
  answers: ["Al Swearengen ", "Wyatt Earp ", "Billy Clanton "],
  correctAnswer: "Al Swearengen "
}, {
  question: "4. Who Killed 'Wild Bill' Hickok?",
  answers: ["Charlie Utter ", "A.W. Merrick ", "Jack McCall "],
  correctAnswer: "Jack McCall "
}, {
  question: "5. What settlement was build illegally on Native American Land?",
  answers: ["Crystal Lake ", "Tombstone ", "Deadwood"],
  correctAnswer: "Deadwood"
}];


//Countdown clock
var game = {
  correct: 0,
  incorrect: 0,
  counter: 45,

  countdown: function () {
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0) {
      console.log('TIME UP');
      game.done();
    }
  },
  start: function () {
    timer = setInterval(game.countdown, 1000);


    $('.container2').prepend('<h2>Time Remaining: <span id="counter-number">45</span> Seconds</h2>');
    $('#start').remove();


    //For loops to retreiving the info inputed by the user
    for (var i = 0; i < questions.length; i++) {
      panel.append('<h2>' + questions[i].question + '</h2>');

      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append('<input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
      }
    }

    panel.append('<button id="done">SUBMIT</button>');
  },
  done: function () {


    $.each($("input[name='question-0']:checked"), function () {
      if ($(this).val() == questions[0].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-1']:checked"), function () {
      if ($(this).val() == questions[1].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-2']:checked"), function () {
      if ($(this).val() == questions[2].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-3']:checked"), function () {
      if ($(this).val() == questions[3].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-4']:checked"), function () {
      if ($(this).val() == questions[4].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    this.result();
  },

  //display the results for the user.
  result: function () {

    clearInterval(timer);

    $('.container2 h2').remove();
    panel.html('<h2>All Done!</h2>');
    panel.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (this.correct + this.incorrect)) + '</h3>');
  }

};