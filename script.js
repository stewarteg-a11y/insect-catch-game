// Grabs all the necessary HTML elements
const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

// Variables to track progress
let seconds = 0;
let score = 0;

// Store the image source of the insect the user picks
let selectedInsect = {};

// Moves to next screen when "pressing" the start button
startBtn.addEventListener('click', () => screens[0].classList.add('up'));

/* When an insect is selected it saves the insects details 
 and moves to the final game screen and starts the 
 startGame() function 
*/
chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedInsect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

// Loops every 1 second
function startGame() {
    setInterval(increaseTime, 1000);
}

/* Calculates minutes and seconds and formats the time. Updates
 the display with the formatted time
 */
function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

// Adds a clickable insect to a random location and at a random rotation
function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

// Checks the insect appears within the boundaries of the browser window
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

/*
When a player clicks on an insect catchInsect is triggered
 this function will increase the score, makes the insect fade
 away and removes it within 2 seconds, then adds in 2 more insects
 after a small delay. This makes the screen more and more crowded as
 the game goes on.
*/
function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

// This function creates two insects with a small delay
function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}


/* This function increases the score and updates the score element
 When the score reaches 20 a message appears asking if the player
 is annoyed yet or if they want to keep going
 */
function increaseScore() {
    score++;

    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}