let matrix1, matrix2, canMultiply;
let score = 0;
let timeLeft = 60;
let timerInterval;

function generateMatrix(rows, cols) {
    return Array.from({length: rows}, () => 
        Array.from({length: cols}, () => Math.floor(Math.random() * 10))
    );
}

function displayMatrix(matrix) {
    return `
        <div class="matrix">
            ${matrix.map(row => `
                <div class="matrix-row">
                    ${row.map(cell => `
                        <div class="matrix-cell">${cell}</div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function generateMatrices() {
    const dims = [[2,2], [2,3], [3,2], [3,3]];
    const dim1 = dims[Math.floor(Math.random() * dims.length)];
    const dim2 = dims[Math.floor(Math.random() * dims.length)];
    
    matrix1 = generateMatrix(dim1[0], dim1[1]);
    matrix2 = generateMatrix(dim2[0], dim2[1]);
    canMultiply = (dim1[1] === dim2[0]);

    document.getElementById('matrices').innerHTML = `
        ${displayMatrix(matrix1)} × ${displayMatrix(matrix2)}
    `;
    document.getElementById('result').textContent = 'Can these matrices be multiplied?';
}

function checkMultiplication(userAnswer) {
    if (userAnswer === canMultiply) {
        document.getElementById('result').textContent = "Correct!";
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        setTimeout(generateMatrices, 1000);
    } else {
        document.getElementById('result').textContent = "Incorrect. Try again!";
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    document.body.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your final score is: ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
}

function startGame() {
    generateMatrices();
    timerInterval = setInterval(updateTimer, 1000);
}

window.onload = startGame;