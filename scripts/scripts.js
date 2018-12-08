var words = [{
    "word": "jazzy",
    "difficulty": "easy"
  },
  {
    "word": "pizza",
    "difficulty": "easy"
  },
  {
    "word": "quick",
    "difficulty": "easy"
  },
  {
    "word": "quack",
    "difficulty": "easy"
  },
  {
    "word": "crazy",
    "difficulty": "easy"
  },
  {
    "word": "watermelon",
    "difficulty": "hard"
  }
]

document.getElementById('button-play').addEventListener("click", function() {
  document.getElementById('div-starting').style.display = "block";
  document.getElementById('button-play').style.display = "none";
  countdown();
}, false);

var number = 6;
var div = document.getElementById('div-countdown');

function countdown() {
  div.textContent = --number;
  div.setAttribute('class', "n-" + number + " text-center");
  if (number === 0) {
    document.getElementById('div-starting').style.display = "none";
    div.parentNode.removeChild(div);
    start();
    return;
  }
  setTimeout(countdown, 1000);
}

var score = 0;
var word = document.getElementById('output-word');
var difficulty = document.getElementById('output-difficulty');
var temp = document.getElementsByClassName('hidden');
var scoreOut = document.getElementById('output-score');
var id = null;

var wordGuess;

function start() {
  for (var i = 0; i <= temp.length - 1; i++) {
    temp[i].style.display = "block";
  }

  word.style.display = "block";
  difficulty.style.display = "block";

  game();
}

function game() {
  scoreOut.innerHTML = "Score: " + score;

  /* Drawing the bar */
  progressBar();

  /* Word */
  let currentWord = words[Math.floor(Math.random() * words.length)];
  wordGuess = currentWord;
  word.innerHTML = formatWord(currentWord.word);
  createTextField(currentWord.word);
  inputWidth(currentWord);
  document.getElementById('focusMe').focus();
  difficulty.innerHTML = "Difficulty: " + currentWord.difficulty;
  console.log(currentWord);
}

function guess(text) {
  var guess = text.value;
  var correct = wordGuess.word.substring(1, wordGuess.word.length - 1);
  if (guess === correct) {
    score++;
    clearInterval(id);
    game();
  }
}

function timesUp() {
  window.alert('out of time');
}

function inputWidth(obj) {
  let width = (obj.word.length - 2) * 80;
  console.log(width);

  document.getElementById('focusMe').style.width = width + "px";
}

function progressBar() {

  var bar = document.getElementById("div-bar");
  var progress = document.getElementById('div-progress');
  bar.style.display = "block";
  progress.style.display = "block";
  var widthBar = progress.offsetWidth;
  var width = progress.offsetWidth;
  id = setInterval(frame, 20000 / width);

  function frame() {
    if (width <= widthBar * 0.25) {
      bar.style.background = "#fe4a49";
    } else {
      bar.style.background = "#2ab7ca";
    }
    if (width <= 0) {
      clearInterval(id);
      timesUp();
      return true;
    } else {
      width--;
      bar.style.width = width + 'px';
    }
  }
}

function formatWord(word) {
  let wordFormat = word.charAt(0) + '<span id="output-text"></span>' + word.charAt(word.length - 1);
  return wordFormat;
}

function createTextField(word) {
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'guess');
  input.setAttribute('class', 'text-input');
  input.setAttribute('maxlength', word.length - 2);
  input.setAttribute('oninput', 'guess(this)');
  input.setAttribute('id', 'focusMe');
  document.getElementById('output-text').appendChild(input);
}