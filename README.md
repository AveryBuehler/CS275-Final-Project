<div align="center">
  <h1>Word Guesser Game</h1>
</div>
<div align="center">
  <strong>An online word-guessing game built entirely in vanilla HTML, CSS, and JavaScript</strong>
</div>
<div align="center">
  <h3>
    <a href="https://averybuehler.github.io/CS275-Final-Project/" target="_blank">
      Play Online
    </a>
  </h3>
</div>
<div align="center">
  <sub>Made for CS275 - Introduction to Internet Programming</sub>
</div>

## Table of Contents
- [Overview](#overview)
  - [How to Play](#how-to-play)
  - [Features](#features)
- [Demo](#demo)
- [Improvements](#improvements)

## Overview
  ### How to Play
  To play Word Guesser, [click here](https://averybuehler.github.io/CS275-Final-Project/). It is being hosted on GitHub Pages.
  
  The purpose of this game is to correctly guess the middle-section of a word. For example: if the screen displayed: `C_T`, the player    has to guess the letter which comes between `C` and `T`. While there are three potentially correct answers (`CAT`, `COT`, and `CUT`), there is only one answer which matters!
  
  > Words are stored in the `words` object so feel free to add your own via the console if you wish 
  
  The player has to be quick in guessing, however, since there are only 5-seconds per round. If they fail to correctly fill-in the blank before the timer runs out, they will lose. If they correctly fill-in the blank, however, they will recieve points based on how difficult the word was.
  
Currently, there are three difficulties: **easy**, **medium**, and **hard**:
- **Easy** words are worth +1 points each and are typically around 5 letters
- **Medium** words are worth +2 points each and are typically around 6 letters
- **Hard** words are worth +3 points each and are typically around 10 letters


Once the player inevitably loses, they'll have the opportunity to compete for a spot on the coveted **local leaderboard**! 

### Features
- The web application is made entirely of **vanilla HTML**, **CSS**, and **JavaScript**
- The application features a  **local leaderboard** utilizing the browser's local storage
- Its only dependencies are **[Google Fonts](https://fonts.google.com/)** and **[Font Awesome 5.6.3](https://fontawesome.com/)**

<sub>The console contains a bunch of information for debugging purposes, so you can cheat if you don't want to use too much brain power! </sub>
## Demo

## Improvements
- [ ] Allow the player to enter in their own set of words before playing
- [ ] Make the web page responsive to various viewports (e.g., mobile, 4k monitors, etc.)
## License
[MIT](https://tldrlegal.com/license/mit-license)
