const emojiQuestions = {
    movies: [
        { emoji: "🎬🍿", answer: "movie night" },
        { emoji: "🦖🌋", answer: "jurassic park" },
        { emoji: "🧙‍♂️🪄", answer: "harry potter" }
    ],
    songs: [
        { emoji: "🎸🎤", answer: "rock star" },
        { emoji: "💃🎶", answer: "dance music" },
        { emoji: "🛶🎵", answer: "row your boat" }
    ],
    tvshows: [
        { emoji: "👽🚀", answer: "stranger things" },
        { emoji: "🏰🐉", answer: "game of thrones" },
        { emoji: "🏥💉", answer: "grey's anatomy" }
    ]
}

let currentMode = null;
let currentPuzzleIndex = 0;

const modeSelectionScreen = document.getElementById("mode-selection");
const gameScreen = document.getElementById("game-screen");
const emojiDisplay = document.getElementById("emoji-display");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const modeButtons = document.querySelectorAll(".mode-button");
const homeButton = document.getElementById("home-button");
const skipButton = document.getElementById("skip-button");

function loadPuzzle() {
    const currentPuzzle = emojiQuestions[currentMode][currentPuzzleIndex];
    emojiDisplay.textContent = currentPuzzle.emoji;
    feedback.textContent = "";
    guessInput.value = "";
}

function checkAnswer() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const correctAnswer = emojiQuestions[currentMode][currentPuzzleIndex].answer;

    if (userGuess === correctAnswer) {
        feedback.textContent = "Correct! 🎉";
        feedback.style.color = "#30bf30";

        setTimeout(() => {
            currentPuzzleIndex = (currentPuzzleIndex + 1) % emojiQuestions[currentMode].length;
            loadPuzzle();
        }, 2000);
    } else {
        feedback.textContent = "Try Again! ❌";
        feedback.style.color = "#b03838";
    }
}

function startGame(mode) {
    currentMode = mode;
    currentPuzzleIndex = 0;
    modeSelectionScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    loadPuzzle();
}

function returnToHome() {
    gameScreen.classList.add("hidden");
    modeSelectionScreen.classList.remove("hidden");
    feedback.textContent = "";
    guessInput.value = "";
}

function skipQuestion(){
    const correctAnswer = emojiQuestions[currentMode][currentPuzzleIndex].answer;

    feedback.textContent = `The correct answer was: ${correctAnswer}`;
    feedback.style.color = "#5a72bf";
    setTimeout(() => {
        currentPuzzleIndex = (currentPuzzleIndex + 1) % emojiQuestions[currentMode].length;
        loadPuzzle();
    }, 2000);
}

modeButtons.forEach(button =>{
    button.addEventListener("click", () => {
        const selectedMode = button.getAttribute("data-mode");
        startGame(selectedMode)
    });
});



submitButton.addEventListener("click", checkAnswer);
homeButton.addEventListener("click", returnToHome);
skipButton.addEventListener("click", skipQuestion);