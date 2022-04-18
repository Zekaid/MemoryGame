var pattern = new Array(8);
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var strikesCounter = 0;

var clueOut = new Array();
var timeInterval;
var timeOut;
var time = 20;

var modes = ["Game Mode: Normal", "Game Mode: Hard"];
var modeInd = 0;
// global constants
var clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

function change() {
  modeInd = modeInd == 0 ? 1 : 0;
  while (clueOut.length != 0) {
    clearTimeout(clueOut.pop());
  }
  document.getElementById("gamemode").innerHTML = modes[modeInd];
  reset();
  gamePlaying = false;
}

function startGame() {
  //initialize game variables
  if (modeInd == 1) {
    document.getElementById("button" + 1).classList.add("hidden");
    document.getElementById("button" + 2).classList.add("hidden");
    document.getElementById("button" + 3).classList.add("hidden");
    document.getElementById("button" + 4).classList.add("hidden");
  }

  document.getElementById("image" + 1).classList.add("hidden");
  document.getElementById("image" + 2).classList.add("hidden");
  document.getElementById("image" + 3).classList.add("hidden");
  document.getElementById("image" + 4).classList.add("hidden");
  document.getElementById("change").classList.add("hidden");
  progress = 0;
  strikesCounter = 0;
  clueHoldTime = 1000;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  for (let i = 0; i < 8; i++) {
    pattern[i] = Math.floor(Math.random() * 4) + 1;
  }

  playClueSequence();
}

function stopGame() {
  clearInterval(timeInterval);
  while (clueOut.length != 0) {
    clearTimeout(clueOut.pop());
  }
  document.getElementById("change").classList.remove("hidden");
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  reset();
  return;
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 523.3,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    document.getElementById("image" + btn).classList.remove("hidden");
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone(btn) {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
  document.getElementById("image" + btn).classList.add("hidden");
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
  if (modeInd == 1)
    document.getElementById("button" + btn).classList.remove("hidden");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  if (modeInd == 1)
    document.getElementById("button" + btn).classList.add("hidden");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  context.resume();

  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    clueOut.push(setTimeout(playSingleClue, delay, pattern[i])); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  if (modeInd == 1) {
    document.getElementById("button" + 1).classList.add("hidden");
    document.getElementById("button" + 2).classList.add("hidden");
    document.getElementById("button" + 3).classList.add("hidden");
    document.getElementById("button" + 4).classList.add("hidden");
  }

  timeOut = setTimeout(startTime, delay - clueHoldTime - cluePauseTime);
  setTimeout(reshow, delay);
}

function reshow() {
  document.getElementById("button" + 1).classList.remove("hidden");
  document.getElementById("button" + 2).classList.remove("hidden");
  document.getElementById("button" + 3).classList.remove("hidden");
  document.getElementById("button" + 4).classList.remove("hidden");
}

function startTime() {
  timeInterval = setInterval(timer, 1000);
}

function reset() {
  time = 20;
  document.getElementById("timer").innerHTML = "Time Left: " + time;
  clearInterval(timeInterval);
  clearTimeout(timeOut);
  while (clueOut.length != 0) {
    clearTimeout(clueOut.pop());
  }
}

function timer() {
  document.getElementById("timer").innerHTML = "Time Left: " + time--;
  if (time < 0) {
    if (strikesCounter != 2) {
      ++strikesCounter;
      alert(3 - strikesCounter + " tries left!");
      reset();
      playClueSequence();
      return;
    }

    loseGame();
  }
}

function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  if (btn == pattern[guessCounter]) {
    guessCounter++;
  } else {
    ++strikesCounter;

    if (strikesCounter == 3) {
      loseGame();
      return;
    }

    if (strikesCounter == 2){
       alert("1 try left!");
    }
    else {
      alert(3 - strikesCounter + " tries left!");
    }

    reset();
    playClueSequence();
    return;
  }

  if (progress + 1 == guessCounter) {
    reset();
    ++progress;
    clueHoldTime *= 0.7;
    if (progress == 8) {
      winGame();
      return;
    }
    playClueSequence();
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won.");
}
