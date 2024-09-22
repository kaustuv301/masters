const setupPage = document.getElementById('setup-page');
const scoreEntry = document.getElementById('score-entry');
const currentRoundDisplay = document.getElementById('current-round');

let totalRounds = 0;
let currentRound = 0;
let gameData = [];

document.getElementById('start-game').addEventListener('click', function() {
    totalRounds = parseInt(document.getElementById('rounds').value);
    if (totalRounds > 0) {
        setupPage.classList.add('hidden');
        showScoreEntry();
    } else {
        alert("Please enter a valid number of rounds.");
    }
});

function showScoreEntry() {
    scoreEntry.classList.remove('hidden');
    currentRoundDisplay.textContent = currentRound + 1;
    generateScoreForm();
}

function generateScoreForm() {
    const form = document.getElementById('score-form');
    form.innerHTML = `
        <label for="kaustuv">Kaustuv:</label>
        <input type="number" id="kaustuv" placeholder="Enter Kaustuv's score" required>
        <label for="jahnavi">Jahnavi:</label>
        <input type="number" id="jahnavi" placeholder="Enter Jahnavi's score" required>
    `;
}

document.getElementById('submit-scores').addEventListener('click', function() {
    const kaustuvScore = parseInt(document.getElementById('kaustuv').value) || 0;
    const jahnaviScore = parseInt(document.getElementById('jahnavi').value) || 0;
    
    gameData.push({ kaustuv: kaustuvScore, jahnavi: jahnaviScore });
    currentRound++;

    if (currentRound < totalRounds) {
        showScoreEntry();
    } else {
        saveGameData();
        window.location.href = 'scoreboard.html'; // Redirect to scoreboard
    }
});

function saveGameData() {
    const existingScores = JSON.parse(localStorage.getItem('rummyScores')) || [];
    const timestamp = new Date().toLocaleString(); // Get current date and time
    existingScores.push({ scores: gameData, timestamp }); // Store scores and timestamp
    localStorage.setItem('rummyScores', JSON.stringify(existingScores));
}

// Button to navigate to the scoreboard
document.getElementById('go-to-scoreboard').addEventListener('click', function() {
    window.location.href = 'scoreboard.html'; // Navigate to scoreboard
});
