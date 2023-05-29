import { World } from "../../pkg"

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.WORLD_WIDTH = 16
        this.CELL_SIZE = 15
        this.SPEED_GAME_IDX = 3
        this.snakeStartIndex = Date.now() % (this.WORLD_WIDTH * this.WORLD_WIDTH)

        this.world = World.new(this.WORLD_WIDTH, this.snakeStartIndex)
        this.canvas.height = this.WORLD_WIDTH * this.CELL_SIZE
        this.canvas.width = this.WORLD_WIDTH * this.CELL_SIZE
    }

    start() {
        this.paint()
        this.update(this.SPEED_GAME_IDX, this.ctx)
    }

    drawWorld() {
        if (!this.ctx) return
        this.ctx.beginPath()

        for (let x = 0; x < this.WORLD_WIDTH + 1; x++) {
            this.ctx.moveTo(this.CELL_SIZE * x, 0)
            this.ctx.lineTo(this.CELL_SIZE * x, this.WORLD_WIDTH * this.CELL_SIZE)
        }
        for (let y = 0; y < this.WORLD_WIDTH + 1; y++) {
            this.ctx.moveTo(0, this.CELL_SIZE * y)
            this.ctx.lineTo(this.WORLD_WIDTH * this.CELL_SIZE, this.CELL_SIZE * y)
        }
        this.ctx.stroke()
    }

    drawSnake() {
        if (!this.ctx) return
        const snakeIdx = this.world.snake_head_idx();
        const x = snakeIdx % this.WORLD_WIDTH
        const y = Math.floor(snakeIdx / this.WORLD_WIDTH)

        this.ctx.beginPath()
        this.ctx.fillRect(
            x * this.CELL_SIZE,
            y * this.CELL_SIZE,
            this.CELL_SIZE,
            this.CELL_SIZE
        )
        this.ctx.stroke()
    }
    paint() {
        this.drawWorld()
        this.drawSnake()
    }

    update(speed) {
        const fps = 1000 / speed
        const self = this
        setTimeout(() => {
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
            self.paint()
            self.world.update()
            requestAnimationFrame(this.update)
        }, fps)
    }
}