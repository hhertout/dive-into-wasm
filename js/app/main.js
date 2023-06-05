import { Direction, World } from "../../pkg";
import { memory } from "../../pkg/index_bg.wasm";

const canvas = document.getElementById("wasm");
if (!canvas) throw Error("Invalid canvas id");

const ctx = canvas.getContext("2d");

const WORLD_WIDTH = 16;
const CELL_SIZE = 15;
const SPEED_GAME_IDX = 10;

const snakeStartIndex = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

const world = World.new(WORLD_WIDTH, snakeStartIndex);
canvas.height = WORLD_WIDTH * CELL_SIZE;
canvas.width = WORLD_WIDTH * CELL_SIZE;

document.addEventListener("keydown", e => {
    switch (e.code) {
        case "ArrowLeft":
            world.set_direction(Direction.Left);
            break;
        case "ArrowRight":
            world.set_direction(Direction.Right);
            break;
        case "ArrowDown":
            world.set_direction(Direction.Down);
            break;
        case "ArrowUp":
            world.set_direction(Direction.Up);
            break;
    }
});

const drawWorld = () => {
    if (!ctx) return;
    ctx.beginPath();

    for (let x = 0; x < WORLD_WIDTH + 1; x++) {
        ctx.moveTo(CELL_SIZE * x, 0);
        ctx.lineTo(CELL_SIZE * x, WORLD_WIDTH * CELL_SIZE);
    }
    for (let y = 0; y < WORLD_WIDTH + 1; y++) {
        ctx.moveTo(0, CELL_SIZE * y);
        ctx.lineTo(WORLD_WIDTH * CELL_SIZE, CELL_SIZE * y);
    }
    ctx.stroke();
};

const drawSnake = () => {
    if (!ctx) return;

    const snakeCells = new Uint32Array(
        memory.buffer,
        world.snake_cells(),
        world.snake_length(),
    )

    snakeCells.forEach((cells_id, index) => {
        const x = cells_id % WORLD_WIDTH;
        const y = Math.floor(cells_id / WORLD_WIDTH);

        ctx.fillStyle = index === 0 ? '#7878db' : "#333333"
        ctx.beginPath();
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })
    ctx.stroke();
};

const paint = () => {
    drawWorld();
    drawSnake();
};

const update = () => {
    if (!ctx) return;
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint();
        world.update();
        requestAnimationFrame(update);
    }, 1000 / SPEED_GAME_IDX);
};

paint();
update();
