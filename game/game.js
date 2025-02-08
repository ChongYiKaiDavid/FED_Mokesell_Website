const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const leaderboardList = document.getElementById("leaderboard-list");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake, direction, food, score, gameRunning = false;

// ✅ Ensure User is Logged In
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
    alert("Please log in to play!");
    window.location.href = "login.html";
}
let userEmail = loggedInUser.email;

// ✅ Reset & Start Game Function
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT"; // Default direction
    food = generateFood();
    score = 0;
    document.getElementById("score").innerText = score;
    gameRunning = true;
    gameLoop(); // ✅ Start the game loop
}

// ✅ Start Game Function
function startGame() {
    if (!gameRunning) {
        resetGame();
        startGameBtn.style.display = "none";
        restartGameBtn.style.display = "block";
    }
}

// ✅ Game Loop (Runs Automatically)
function gameLoop() {
    if (!gameRunning) return;

    moveSnake(); // ✅ Move the snake in every loop

    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        saveScore(score);
        gameRunning = false;
        startGameBtn.style.display = "block";
        return;
    }

    drawGame();
    setTimeout(gameLoop, 150); // ✅ Keep looping every 150ms
}

// ✅ Save Score Locally
function saveScore(score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ user: userEmail, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    alert("Score saved successfully!");
    loadLeaderboard();
}

// ✅ Load Leaderboard from LocalStorage
function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardList.innerHTML = "";
    leaderboard.slice(0, 5).forEach((entry, index) => {
        leaderboardList.innerHTML += `<li>#${index + 1} ${entry.user} - ${entry.score} pts</li>`;
    });
}

// ✅ Generate Random Food Position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// ✅ Move Snake (Fix for Not Moving Issue)
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

// ✅ Draw Game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ✅ Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // ✅ Draw Snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // ✅ Draw Border
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// ✅ Check for Collisions
function checkCollision() {
    let head = snake[0];

    // ✅ Check if snake hits walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;

    // ✅ Check if snake hits itself
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// ✅ Handle Arrow Key Movements (Fix for Not Moving)
document.addEventListener("keydown", (event) => {
    if (!gameRunning) return;
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// ✅ Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    startGameBtn.addEventListener("click", startGame);
    restartGameBtn.addEventListener("click", resetGame);
    loadLeaderboard();
});
