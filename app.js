const paragraphs = [
    "the quick brown fox jumps over the lazy dog",
    "javascript is an amazing programming language for web developers",
    "practice makes a man perfect so keep typing every single day",
    "success is not final failure is not fatal it is the courage to continue",
    "coding is the art of transforming logical thinking into software applications",
    "consistency and continuous practice are the ultimate keys to master web development"
];

let targetTextEl = document.getElementById("target-text");
let inputBoxEl = document.getElementById("input-box");
let timerEl = document.getElementById("timer");
let resultMessageEl = document.getElementById("result-message");

let timeLeft = 15;
let timerInterval = null;
let isPlaying = false;

function resetGame() {
    clearInterval(timerInterval);
    timeLeft = 15;
    isPlaying = false;
    
    timerEl.innerText = timeLeft;
    inputBoxEl.value = "";
    inputBoxEl.disabled = false;
    resultMessageEl.innerText = "";
    
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    targetTextEl.innerText = paragraphs[randomIndex];
    
    inputBoxEl.focus();
}

function startTyping() {
    if (isPlaying === false) {
        isPlaying = true;
        
        timerInterval = setInterval(function() {
            timeLeft = timeLeft - 1;
            timerEl.innerText = timeLeft;

            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    if (inputBoxEl.value === targetTextEl.innerText) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    inputBoxEl.disabled = true;

    let totalWordsTyped = inputBoxEl.value.split(" ").length;
    
    if (inputBoxEl.value.trim() === "") {
        totalWordsTyped = 0;
    }

    let timeTaken = 15 - timeLeft;
    if (timeTaken === 0) timeTaken = 1;
    
    let wpm = Math.round((totalWordsTyped / timeTaken) * 60);

    if (inputBoxEl.value === targetTextEl.innerText && timeLeft > 0) {
        resultMessageEl.innerHTML = "🌟 <b>Outstanding Performance!</b> You finished with " + timeLeft + " seconds left. Your Speed: " + wpm + " WPM! Keep it up! 🔥";
    } 
    else if (inputBoxEl.value === targetTextEl.innerText) {
        resultMessageEl.innerHTML = "🎉 <b>Excellent!</b> You typed everything perfectly. Your Speed: " + wpm + " WPM!";
    } 
    else {
        resultMessageEl.innerHTML = "⏱️ <b>Time's Up!</b> Good try! Your Typing Speed is: " + wpm + " WPM. Practice more!";
    }
}
resetGame();