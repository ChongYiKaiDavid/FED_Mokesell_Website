const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const leaderboardList = document.getElementById("leaderboard-list");

const API_URL = "https://davidchong-6ae9.restdb.io/rest/leaderboard ";
const API_KEY = "67a6f075cab64154577265ac";

canvas.width = 400;
canvas.height = 400;

const box = 20; // Grid size
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let gameRunning = false; // Initially, game is paused

// Control Snake with Keyboard
document.addEventListener("keydown", changeDirection);

// Start Game Function
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startGameBtn.style.display = "none";
        gameLoop();
    }
}

// Main Game Loop
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

// Move Snake
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

// Change Direction
function changeDirection(event) {
    if (!gameRunning) return;
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Generate Random Food Position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// Check Collision with Walls or Itself
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

// Draw Snake & Food
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));
}

// Restart Game
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

// Save Score to RestDB.io
async function saveScore(score) {
    const playerName = prompt("Enter your name:", "Player");
    if (!playerName) return;
    
    const data = {
        name: playerName,
        score: score
    };
    
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY
        },
        body: JSON.stringify(data)
    });
    loadLeaderboard();
}

// Load Leaderboard from RestDB.io
async function loadLeaderboard() {
    const response = await fetch(API_URL + "?sort=score&dir=-1&max=5", {
        headers: { "x-apikey": API_KEY }
    });
    const scores = await response.json();
    leaderboardList.innerHTML = "";
    scores.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });
}

// Event Listener for Start Game Button
startGameBtn.addEventListener("click", startGame);

// Load leaderboard on page load
document.addEventListener("DOMContentLoaded", loadLeaderboard);
