const API_URL = "https://userinfo-4b8c.restdb.io/rest/";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const leaderboardList = document.getElementById("leaderboard-list");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let gameRunning = false;

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
    window.location.href = "login.html";
}
let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

// Start Game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startGameBtn.style.display = "none";
        gameLoop();
    }
}

// Game Loop
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

// Check Collision
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Save Score and Store in RESTdb
async function saveScore(score) {
    try {
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

// Load Leaderboard from RESTdb
async function loadLeaderboard() {
    try {
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

// Claim Rewards from RESTdb
async function claimReward() {
    try {
        let response = await fetch(`${API_URL}?q={"user": "${userEmail}"}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let userScores = await response.json();
        let totalRewards = userScores.reduce((acc, entry) => acc + entry.rewards, 0);

        if (totalRewards >= 50) {
            alert("🎉 You claimed a discount coupon!");
        } else {
            alert(`You have ${totalRewards} rewards. Keep playing to earn more!`);
        }
    } catch (error) {
        console.error("Error claiming rewards:", error);
    }
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
}

startGameBtn.addEventListener("click", startGame);
document.addEventListener("DOMContentLoaded", loadLeaderboard);
