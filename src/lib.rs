use core::panic;
use std::vec;

use wasm_bindgen::prelude::*;

//  wasm-pack build --target web
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Right,
    Down,
    Left,
}
pub struct SnakeCell(usize);
struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    fn new(spawn_index: usize, size: usize) -> Snake {
        let mut body = vec![];
        for i in 0..size {
            body.push(SnakeCell(spawn_index - i));
        }

        Snake {
            body,
            direction: Direction::Left,
        }
    }
}
// This is like the `main` function, except for JavaScript.
#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_idx: usize) -> World {
        World {
            width,
            size: width * width,
            snake: Snake::new(snake_idx, 3),
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }
    pub fn size(&self) -> usize {
        self.size
    }

    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn step(&mut self) {
        let next_cell: SnakeCell = self.gen_next_snake_cell();
        self.snake.body[0] = next_cell;
    }

    fn gen_next_snake_cell(&self) -> SnakeCell {
        let snake_idx: usize = self.snake_head_idx();
        let row = snake_idx / self.width;

        return match self.snake.direction {
            Direction::Right => SnakeCell((row * self.width) + (snake_idx + 1) % self.width),
            Direction::Left => SnakeCell((row * self.width) + (snake_idx - 1) % self.width),
            Direction::Up => SnakeCell((snake_idx - self.width) % self.size),
            Direction::Down => SnakeCell((snake_idx + self.width) % self.size),
        };
    }

    pub fn set_direction(&mut self, direction: Direction) {
        self.snake.direction = direction;
    }

    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }

    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }
}
