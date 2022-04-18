# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Wesley Kiang**

Time spent: **16** hours spent in total

Link to project: https://unique-atom-diplodocus.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:
* [x] User can toggle between normal mode and hard mode
* [x] When the sequence is playing, hard mode removes all buttons except the one that is currently playing
* [x] Time left is displayed, and users are also notified about the amount of tries they have left


## Video Walkthrough (GIF)
**Beating the Normal Game Mode**
![](https://i.imgur.com/hUYwMyF.gif)


**Beating the Hard Game Mode**
![](https://i.imgur.com/baGCgwa.gif)

**Using up 3 tries**
![](https://i.imgur.com/qfYCDYE.gif)

**Running out of time**
![](https://i.imgur.com/Hrzr2Am.gif)

## Reflection Questions
**1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.**
I referenced HTML, CSS, and JavaScript syntax on W3schools.

**2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)** 
One of the hardest challenges in creating this project was fixing the edge cases for “setTimeout”. There were mainly two edge cases that were hard to identify and resolve. First, “setTimeout” usually only executes a function once after a certain amount of delay, as opposed to “setInterval”. Therefore, I did not bother to call “clearTimeout” for any of the “setTimeout” functions called throughout the program. However, after playing around with my own game, I realized that if I pressed start and stop extremely quickly, “setTimeout” will still run the specified function despite that the game has already stopped. This caused the time function I built to run continuously until I refreshed the page. This also caused “playClueSequence” to behave oddly. If I stopped the game and started another game while a sequence is playing, the very next “playSingleClue” call will still be programmed to run by “setTimeout”. Thus, when the player starts a new game, the game will play 2 tiles instead of 1. These two bugs led to the inception of many more bugs elsewhere. Sometimes, for instance, I would not be able to stop the game, the timer would decrease by 2 seconds instead of 1, or the game buttons themselves would prompt the game to restart. I overcame this problem by testing each specific function in my JavaScript code and reanalyzing the functions of setInterval and setTimeout. By doing so, I realized that setTimeout was the root of my problems, and I was able to write code in certains parts of the script to counteract the edge cases mentioned earlier.

**3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)**
Throughout this assignment, as well as in my own personal projects, I realized that there was a huge portion of HTML tags and CSS properties that I do not know of. This made me wonder what certain attributes or techniques serve as the bread and butter of a frontend programmer. Taking a step further, this assignment also made me question how frameworks like Node.js or Angular.js can be incorporated with static HTML and CSS files. 
Lastly, I used to always think that games were programmed in languages like C++. I was very surprised when I was able to create this memory game out of languages that are generally frontend based. This made me question how far one can take web development with only HTML, CSS, and JavaScript, and in what cases does one need to turn to server-side (backend) development in web development.

**4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)**
I would definitely focus on making the game bug proof and aesthetic. I noticed that when I tried to spam the buttons or press the buttons before the sequence has ended, my game will start to bug out and the functions will stop working the way I want them to. Sometimes, the images will no longer disappear, or “playClueSequence'' will overlap with itself multiple times. I already fixed many bugs by identifying the issue with “setTimeout". However, there are still some edge cases that unexpectedly pop up once in a while, and I would like to ensure that all such cases are taken care of. Secondly, I would definitely focus on improving the aesthetics of the game. The background color is extremely bland, the buttons look boring, and the layout of my timer is not ideal. Speaking of timers, I would like to implement a stopwatch that visually shows users how much time they have left. This would make the game more dynamic and cool. Once the standard is set, I will then expand to create more features. These would include making harder modes where the player can only depend on sound, have 8 game buttons, or where the user has to click immediately after each “playSingleClue” before the next “playSingleClue” executes.



## Interview Recording URL Link

https://www.youtube.com/watch?v=p0-TRm7nyys


## License

    Copyright [Wesley Kiang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
