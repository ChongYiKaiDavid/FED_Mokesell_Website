const API_URL = "https://mokesell-d690.restdb.io/rest/userinfo"; // Your new RESTdb URL
const API_KEY = "67a777184d8744758f828036"; // Your API Key

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const leaderboardList = document.getElementById("leaderboard-list");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake;
let direction;
let food;
let score;
let gameRunning = false;

// ✅ Ensure User is Logged In
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
    alert("Please log in to play!");
    window.location.href = "login.html";
}
let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

// ✅ Reset & Start Game Function
function resetGame() {
    snake = [{ x: 200, y: 200 }];  // Ensures the snake appears
    direction = "RIGHT";
    food = generateFood();
    score = 0;
    document.getElementById("score").innerText = score;
    gameRunning = true;
}

// ✅ Start Game Function
function startGame() {
    if (!gameRunning) {
        resetGame();
        startGameBtn.style.display = "none";
        restartGameBtn.style.display = "block";
        gameLoop();
    }
}

// ✅ Game Loop
function gameLoop() {
    if (!gameRunning) return;

    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        saveScore(score);
        gameRunning = false;
        startGameBtn.style.display = "block";
        return;
    }

    drawGame(); // ✅ Draws snake & food
    setTimeout(gameLoop, 100);
}

// ✅ Draw Everything (Fixing Snake Not Appearing)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw Snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw Border
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// ✅ Move Snake
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

// ✅ Check for Collisions
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// ✅ Restart Game
function restartGame() {
    resetGame();
    gameLoop();
}

// ✅ Save Score to RESTdb
async function saveScore(score) {
    try {
        console.log("Saving score:", score);
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: userEmail,
                score: score,
                rewards: score * 2, // Earn 2x rewards per point
                timestamp: new Date()
            })
        });

        if (response.ok) {
            alert("Score saved successfully!");
            loadLeaderboard();
        } else {
            alert("Failed to save score.");
        }
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

// ✅ Load Leaderboard from RESTdb
async function loadLeaderboard() {
    try {
        console.log("Loading leaderboard...");
        let response = await fetch(`${API_URL}?sort=-score&max=5`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let leaderboard = await response.json();
        leaderboardList.innerHTML = "";

        leaderboard.forEach((entry, index) => {
            leaderboardList.innerHTML += `
                <li>#${index + 1} ${entry.user} - ${entry.score} pts</li>`;
        });

    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

// ✅ Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    startGameBtn.addEventListener("click", startGame);
    restartGameBtn.addEventListener("click", restartGame);
    loadLeaderboard();
});

// ✅ Generate Random Food Position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// ✅ Handle Arrow Key Movements
document.addEventListener("keydown", (event) => {
    if (!gameRunning) return;
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});
