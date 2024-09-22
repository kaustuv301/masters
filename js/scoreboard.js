const scoreTable = document.getElementById('score-table');
const removeLastGameButton = document.getElementById('remove-last-game');
const backHomeButton = document.getElementById('back-home');
const newGameButton = document.getElementById('new-game');

let kaustuvWins = 0;
let jahnaviWins = 0;

function loadScoreboard() {
    const scores = JSON.parse(localStorage.getItem('rummyScores')) || [];
    scoreTable.innerHTML = '';

    let totalRounds = 0;

    scores.forEach((game) => {
        totalRounds++; // Count each game as a round played
        const kaustuvTotal = game.scores.reduce((sum, round) => sum + round.kaustuv, 0);
        const jahnaviTotal = game.scores.reduce((sum, round) => sum + round.jahnavi, 0);
        const winner = kaustuvTotal < jahnaviTotal ? 'Kaustuv' : 'Jahnavi';

        // Update win counts
        if (winner === 'Kaustuv') {
            kaustuvWins++;
        } else {
            jahnaviWins++;
        }

        scoreTable.innerHTML += `
            <tr>
                <td>${game.timestamp}</td>
                <td>${kaustuvTotal}</td>
                <td>${jahnaviTotal}</td>
                <td>${winner}</td>
            </tr>
        `;
    });

    // Update total wins and rounds displayed
    document.getElementById('kaustuv-wins').textContent = kaustuvWins;
    document.getElementById('jahnavi-wins').textContent = jahnaviWins;
    document.getElementById('total-rounds').textContent = totalRounds;
}

removeLastGameButton.addEventListener('click', function() {
    const scores = JSON.parse(localStorage.getItem('rummyScores')) || [];
    if (scores.length > 0) {
        scores.pop(); // Remove the last game
        localStorage.setItem('rummyScores', JSON.stringify(scores));
        loadScoreboard(); // Reload the scoreboard
    }
});

backHomeButton.addEventListener('click', function() {
    window.location.href = 'index.html'; // Navigate back to the home page
});

newGameButton.addEventListener('click', function() {
    window.location.href = 'index.html'; // Start a new game
});

// Load the scoreboard on page load
window.onload = loadScoreboard;
