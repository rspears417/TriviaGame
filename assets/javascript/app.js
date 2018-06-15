//Questions

var questions = [{
  question: "In what month is Harry Potter's Birthday",
  answers: ["November", "March", "August", "July"],
  correctAnswer: "July",
  image:"https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy-downsized.gif"
}, {
  question: "What do the passwords for Dumbledore's office all have in common?",
  answers: ["Names of Sweets", "Names of Spells", "Names of Professors", "Names of Fruit"],
  correctAnswer: "Names Of Sweets",
  image:"https://media.giphy.com/media/ZB19HE9rRWhm8/giphy-downsized.gif"
}, {
  question: "Which language, like Voldemort, is Harry able to speak?",
  answers: ["Mermish", "Parseltongue", "Elfish", "Troll"],
  correctAnswer: "Parseltongue",
  image:"https://media.giphy.com/media/47szmfLbvap8I/giphy.gif"
}, {
  question: "Who is the attractive barmaid and owner of the Three Broomsticks in Hogsmeade?",
  answers: ["Madam Hooch", "Madam Pomfrey", "Madam Rosmerta", "Madam Maxine"],
  correctAnswer: "Madam Rosmerta",
  image:"https://media.giphy.com/media/lqrfa12pjBWlq/giphy-downsized.gif"
}, {
  question: 'Which Quidditch team does Ron support?',
  answers: ["Chudley Cannons", "Puddlemere United", "Wimbourne Wasps", "Tutshill Tornados"],
  correctAnswer: "Chudley Cannons",
  image:"https://media.giphy.com/media/vWXBcu2vP8h8Y/giphy-downsized.gif"
}, {
  question: 'What is the potion Harry and Ron use to transform into Crabbe and Goyle?',
  answers: ["Mandrake Potion", "Polyjuice Potion", "Felix Felicis", "Elixir of Life"],
  correctAnswer: "Polyjuice Potion",
  image:"https://media.giphy.com/media/WLXYBlFuBiuQM/giphy.gif"
}, {
  question: " Which animal is the house emblem for Gryffindor?",
  answers: ["Lion", "Badger", "Snake", "Wolf"],
  correctAnswer: "Lion",
  image:"https://i.gifer.com/9k1p.gif"
}, {
  question: "Which device enabled Hermione to attend three classes at once in her third year?",
  answers: ["Remembrall", "Time-Turner", "Philosopher's Stone", "Sneakoscope"],
  correctAnswer: "Time-Turner",
  image:"https://media.giphy.com/media/k2AvcU8nZyg7K/giphy-downsized.gif"
}];

var panel = $('#quiz-area');
var countStartNumber = 30;




//CLICK EVENTS


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});






var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};









