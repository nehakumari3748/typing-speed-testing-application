// script.js
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

// Sample texts
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect. Keep trying!",
    "Typing fast is a valuable skill."
];

let startTime;
let interval;
let timer = 0;
let wpm = 0;
let accuracy = 0;
let errors = 0;

function getRandomText() {
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
}

function startTest() {
    textInput.disabled = false;
    textInput.focus();
    textInput.value = "";
    startTime = new Date();
    timer = 0;
    wpm = 0;
    accuracy = 100;
    errors = 0;
    updateResults();

    textDisplay.textContent = getRandomText();
    startButton.disabled = true;

    interval = setInterval(() => {
        timer++;
        calculateWPM();
        calculateAccuracy();
        updateResults();
    }, 1000);
}

function resetTest() {
    clearInterval(interval);
    textInput.value = "";
    textDisplay.textContent = "Press \"Start\" to begin typing...";
    textInput.disabled = true;
    timer = 0;
    wpm = 0;
    accuracy = 100;
    errors = 0;
    updateResults();
    startButton.disabled = false;
}

function calculateWPM() {
    const wordsTyped = textInput.value.trim().split(" ").length;
    wpm = Math.round((wordsTyped / timer) * 60);
}

function calculateAccuracy() {
    const typedText = textInput.value;
    const originalText = textDisplay.textContent;
    let correctChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctChars++;
        } else {
            errors++;
        }
    }

    accuracy = Math.max(0, Math.round((correctChars / originalText.length) * 100));
}

function updateResults() {
    timerDisplay.textContent = `Time: ${timer}s`;
    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

startButton.addEventListener("click", startTest);
resetButton.addEventListener("click", resetTest);
textInput.addEventListener("input", () => {
    calculateAccuracy();
    calculateWPM();
});
