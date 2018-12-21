/*
  Avery Buehler
  CS275: Intro to Internet Programming
  20 December 2018

  Word Guesser game
*/

/* Object with words */
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
    "word": "puzzle",
    "difficulty": "medium"
  },
  {
    "word": "buzzer",
    "difficulty": "medium"
  },
  {
    "word": "dazzle",
    "difficulty": "medium"
  },
  {
    "word": "coccyx",
    "difficulty": "medium"
  },
  {
    "word": "wheeze",
    "difficulty": "medium"
  },
  {
    "word": "watermelon",
    "difficulty": "hard"
  },
  {
    "word": "lumberjack",
    "difficulty": "hard"
  },
  {
    "word": "mozzarella",
    "difficulty": "hard"
  },
  {
    "word": "volleyball",
    "difficulty": "hard"
  },
  {
    "word": "government",
    "difficulty": "hard"
  },
  {
    "word": "strawberry",
    "difficulty": "hard"
  },
  {
    "word": "university",
    "difficulty": "hard"
  }
]

/* Declaring a number of variables */
var number = 6;
var div = document.getElementById('div-countdown');
var score = 0;
var word = document.getElementById('output-word');
var difficulty = document.getElementById('output-difficulty');

/* Using local storage for the leaderboard */
var leaderboard = JSON.parse(localStorage.getItem('lb') || "[]");
var temp = document.getElementsByClassName('hidden');
var scoreOut = document.getElementById('output-score');
var bar = document.getElementById("div-bar");
var progress = document.getElementById('div-progress');
var id = null;
var wordGuess;

/* Adding a listener to the play button */

document.getElementById('button-play').addEventListener("click", function() {
  document.getElementById('id-cdwrapper').style.display = "block";
  document.getElementById('button-play').style.display = "none";
  document.getElementById('hide-infowrapper').style.display = "none";
  countdown(); /* When clicked, the countdown timer will start */
}, false);

/* Adding a listener to the restart button */

document.getElementById('resetgame').addEventListener("click", function() {
  score = 0;
  clearInterval(id);
  game();
}, false);

/* Adding a listener to the home button */
document.getElementById('gohome').addEventListener("click", function() {
  document.getElementById('id-bottomControls').style.display = "none";
  document.getElementById('hide-infowrapper').style.display = "block";
  document.getElementById('id-timesup').style.display = "none";
  document.getElementById('button-play').style.display = "block";
  bar.style.display = "none";
  progress.style.display = "none";
  for (var i = 0; i <= temp.length - 1; i++) {
    temp[i].style.display = "none";
  }
  number = 6;
  score = 0;
  clearInterval(id);
  updateBoard(leaderboard);
}, false);

/* Adding a listener for the leaderboard submit button */
document.getElementById('lb-submit').addEventListener("click", function() {
  onBoard(document.getElementById('lb-text-input').value);
  document.getElementById('id-bottomControls').style.display = "none";
  document.getElementById('hide-infowrapper').style.display = "block";
  document.getElementById('id-timesup').style.display = "none";
  document.getElementById('button-play').style.display = "block";
  bar.style.display = "none";
  progress.style.display = "none";
  for (var i = 0; i <= temp.length - 1; i++) {
    temp[i].style.display = "none";
  }
  number = 6;
  score = 0;
  clearInterval(id);
  updateBoard(leaderboard);
}, false);

/* Adding a listener for clearing local storage */
document.getElementById('clear-ls').addEventListener("click", function() {
  localStorage.clear();
  updateBoard(leaderboard);
  window.alert('Local storage cleared.');
}, false);

/* Countdown at the beginning */
function countdown() {
  div.style.display = "block";
  div.textContent = --number;
  div.setAttribute('class', "n-" + number + " text-center");
  if (number === 0) {
    document.getElementById('id-cdwrapper').style.display = "none";
    document.getElementById('id-bottomControls').style.display = "block";
    div.style.display = "none";
    start();
    return;
  }
  setTimeout(countdown, 1000);
}

/* Starting the game after the countdown */
function start() {
  for (var i = 0; i <= temp.length - 1; i++) {
    temp[i].style.display = "block";
  }

  word.style.display = "block";
  difficulty.style.display = "block";

  game();
}

/* Getting the word & resetting the progress bar */
function game() {
  scoreOut.innerHTML = "Score: <span class='text-scoreNum'>" + score + "</span>";

  /* Drawing the bar */
  progressBar();

  /* Word */
  var currentWord = words[Math.floor(Math.random() * words.length)];

  /* There are 3 phases of the game */
  if (score <= 3) {
    console.log('Phase 1');
    while (currentWord.difficulty != "easy") {
      currentWord = words[Math.floor(Math.random() * words.length)];
    }
  }
  if (score > 3 && score < 9) {
    console.log('Phase 2');
    while (currentWord.difficulty == "hard") {
      currentWord = words[Math.floor(Math.random() * words.length)];
    }
  }
  if (score >= 9) {
    console.log('Phase 3');
    currentWord = words[Math.floor(Math.random() * words.length)];
  }

  wordGuess = currentWord;
  word.innerHTML = formatWord(currentWord.word);
  createTextField(currentWord.word);
  inputWidth(currentWord);
  document.getElementById('focusMe').focus();
  difficulty.innerHTML = "Difficulty: " + currentWord.difficulty;
  console.log(currentWord);
}

/* Checking if the guess is correct or not */
function guess(text) {
  var guess = text.value;
  var correct = wordGuess.word.substring(1, wordGuess.word.length - 1);
  if (guess === correct) {
    switch (wordGuess.difficulty) {
      case "easy":
        score++;
        break;

      case "medium":
        score += 2;
        break;

      case "hard":
        score += 3;
        break;
    }

    clearInterval(id);
    game();
  }
}

/* Displaying the "Out of time" screen */
function timesUp() {
  bar.style.display = "none";
  progress.style.display = "none";
  word.style.display = "none";
  difficulty.style.display = "none";
  document.getElementById('id-timesup').style.display = "block";
  document.getElementById('final-word').innerHTML = wordGuess.word;
  document.getElementById('id-bottomControls').style.display = "none";
  for (var i = 0; i <= temp.length - 1; i++) {
    temp[i].style.display = "none";
  }
  document.getElementById('finalscore').innerHTML = score;
}

/* Checks if the user got a spot on the leaderboard */
function onBoard(name) {
  leaderboard = JSON.parse(localStorage.getItem('lb') || "[]");

  var lbentity = {
    "name": name,
    "score": score,
    "date": new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York'
    })
  }

  if (leaderboard.length < 10) {
    leaderboard.push(lbentity);
  }

  if (leaderboard.length >= 10) {
    if (score >= leaderboard[9].score) {
      leaderboard[9] = lbentity;
    }
  }

  leaderboard = sortLB(leaderboard);

  localStorage.setItem('lb', JSON.stringify(leaderboard));

  updateBoard(leaderboard);
}

updateBoard(leaderboard);

/* Updates the leaderboard */
function updateBoard(leaderboard) {
  leaderboard = sortLB(leaderboard);
  if (localStorage.getItem('lb') !== null) {

    console.log('Local storage not empty.');

    var topThree = document.getElementById('lb-best');
    var lastSeven = document.getElementById('lb-worst');
    var lbgold = document.getElementById('lb-gold');
    var lbsilver = document.getElementById('lb-silver');
    var lbbronze = document.getElementById('lb-bronze');
    document.getElementById('leaderboard-start').style.display = "none";
    document.getElementsByClassName('lb-parent')[0].style.display = "flex";

    switch (leaderboard.length) {
      case 1:
        lbgold.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[0].name + ": " + leaderboard[0].score;
        lbgold.style.display = "block";
        break;
      case 2:
        lbgold.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[0].name + ": " + leaderboard[0].score;
        lbsilver.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[1].name + ": " + leaderboard[1].score;
        lbgold.style.display = "block";
        lbsilver.style.display = "block";
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        lbgold.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[0].name + ": " + leaderboard[0].score;
        lbsilver.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[1].name + ": " + leaderboard[1].score;
        lbbronze.innerHTML = "<i class='fas fa-medal'></i>" + leaderboard[2].name + ": " + leaderboard[2].score;
        lbgold.style.display = "block";
        lbsilver.style.display = "block";
        lbbronze.style.display = "block";
        break;

    }

    switch (leaderboard.length) {
      case 1:
      case 2:
      case 3:
        topThree.style.width = 100 + "%";
        lastSeven.style.display = "none";
        break;
      default:
        topThree.style.width = 70 + "%";
        lastSeven.style.display = "flex";
        break;
    }

    var worstNumbers = document.getElementsByClassName('lb-norank');

    if (leaderboard.length > 3) {
      for (var index = 0; index < leaderboard.length - 3; index++) {
        worstNumbers[index].innerHTML = "<span class='poo-emoji'>💩</span>" + leaderboard[index + 3].name + ": " + leaderboard[index + 3].score;
        worstNumbers[index].style.display = "block";
      }
    }
  } else {
    document.getElementById('leaderboard-start').style.display = "block";
    document.getElementsByClassName('lb-parent')[0].style.display = "none";
    console.log('Local storage empty.');
  }
}

/* Sorting algorithm used for leaderboard */
function sortLB(arr) {
  var len = arr.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (arr[j - 1].score < arr[j].score) {
        var temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

/* Used for the width of the input field */
function inputWidth(obj) {
  let width = 0;
  switch (obj.difficulty) {
    case "easy":
      width = (obj.word.length - 2) * 80 - 5;
      break;
    case "medium":
      width = (obj.word.length - 2) * 80 - 7;
      break;
    case "hard":
      width = (obj.word.length - 2) * 79 - 6;
      break;
  }

  document.getElementById('focusMe').style.width = width + "px";
}

/* Used for the progress bar */
function progressBar() {
  bar.style.display = "block";
  progress.style.display = "block";
  var widthBar = progress.offsetWidth;
  var width = progress.offsetWidth;

  id = setInterval(frame, 5000 / width);

  function frame() {
    if (wordGuess.difficulty == "easy") {
      bar.style.background = "#edc951";
    } else if (wordGuess.difficulty == "medium") {
      bar.style.background = "#eb6841";
    } else if (wordGuess.difficulty == "hard") {
      bar.style.background = "#cc2a36";
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

/* Used to format the word */
function formatWord(word) {
  let wordFormat = word.charAt(0) + '<span id="output-text"></span>' + word.charAt(word.length - 1);
  return wordFormat;
}

/* Used to create the text field */
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