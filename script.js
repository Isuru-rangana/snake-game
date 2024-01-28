const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const box = 25; // Adjust box size as needed
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Snake
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let dx = box;
let dy = 0;

// Food
let food = {
    x: Math.floor(Math.random() * (canvasWidth / box)) * box,
    y: Math.floor(Math.random() * (canvasHeight / box)) * box
};

// Score
let score = 0;
const scoreDisplay = document.getElementById('score');

// Event listeners
canvas.addEventListener('mousemove', updateDirection);

// Direction update function
function updateDirection(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;
    const snakeX = snake[0].x;
    const snakeY = snake[0].y;

    // Check the direction of mouse movement relative to the snake's head
    if (mouseX > snakeX && dx !== -box) { // Move right
        dx = box;
        dy = 0;
    } else if (mouseX < snakeX && dx !== box) { // Move left
        dx = -box;
        dy = 0;
    } else if (mouseY < snakeY && dy !== box) { // Move up
        dx = 0;
        dy = -box;
    } else if (mouseY > snakeY && dy !== -box) { // Move down
        dx = 0;
        dy = box;
    }
}

// Collision detection
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything to the canvas
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'darkgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake
    snakeX += dx;
    snakeY += dy;

    // If the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = {
            x: Math.floor(Math.random() * (canvasWidth / box)) * box,
            y: Math.floor(Math.random() * (canvasHeight / box)) * box
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Create new head
    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over conditions
    if (snakeX < 0 || snakeX >= canvasWidth || snakeY < 0 || snakeY >= canvasHeight || collision(newHead, snake)) {
        clearInterval(game);
    }

    // Add new head to snake
    snake.unshift(newHead);
}

// Game loop
let game = setInterval(draw, 100);
