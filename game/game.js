const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const leaderboardList = document.getElementById("leaderboard-list");
const leaderboardContainer = document.querySelector(".leaderboard");

canvas.width = 400;
canvas.height = 400;

const box = 20; // Grid size
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let gameRunning = false;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Control Snake with Keyboard
document.addEventListener("keydown", changeDirection);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startGameBtn.style.display = "none";
        gameLoop();
    }
}

function gameLoop() {
    if (!gameRunning) return;

    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        saveScore(score);
        restartGame();
        return;
    }

    moveSnake();
    drawGame();
    setTimeout(gameLoop, 100);
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    if (!gameRunning) return;
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));
}

function restartGame() {
    gameRunning = false;
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = generateFood();
    score = 0;
    document.getElementById("score").innerText = score;
    startGameBtn.style.display = "block";
    loadLeaderboard();
}

function saveScore(score) {
    const playerName = prompt("Enter your name:", "Player");
    if (!playerName) return;
    
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    loadLeaderboard();
}

function loadLeaderboard() {
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class='rank'>#${index + 1}</span> <span class='player-name'>${entry.name}</span> <span class='player-score'>${entry.score}</span>`;
        leaderboardList.appendChild(li);
    });
    leaderboardContainer.style.display = "block";
}

function clearLeaderboard() {
    leaderboard = [];
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    loadLeaderboard();
}

startGameBtn.addEventListener("click", startGame);
document.addEventListener("DOMContentLoaded", loadLeaderboard);
