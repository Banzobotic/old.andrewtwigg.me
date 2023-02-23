export { Snake };

enum Direction {
    Up,
    Down,
    Left,
    Right,
}


class Snake {
    private snake: Array<Cell>;
    private moving: boolean;
    private food: Cell;
    private draw_list: Array<BodySegment>;

    constructor() {
        this.snake = [new Cell(3, 7), new Cell(4, 7), new Cell(5, 7), new Cell(5, 6), new Cell(5, 5), new Cell(4, 5), new Cell(3, 5), new Cell(3, 6)];
        this.moving = false;
        this.food = new Cell(10, 7);
        this.draw_list = [];
    }

    start() {
        this.moving = true;
        this.move();
    }

    move() {

    }

    create_draw_list() {
        let draw_list: Array<BodySegment> = [];
        let length = 1;
        let prev_direction = Direction.Right;
        let current_direction: Direction = Direction.Right;
        let prev_segment: Cell = this.snake[0];
        let current_segment: Cell;
        let start_segment: Cell = prev_segment; 

        for (let i = 1; i < this.snake.length; i++) {
            current_segment = this.snake[i];

            if (current_segment.x - prev_segment.x > 0) {
                current_direction = Direction.Right;
            } else if (current_segment.x - prev_segment.x < 0) {
                current_direction = Direction.Left;
            } else if (current_segment.y - prev_segment.y > 0) {
                current_direction = Direction.Down;
            } else {
                current_direction = Direction.Up;
            }

            if (prev_direction == current_direction) {
                length += 1;
            } else {
                draw_list.push(new BodySegment(start_segment, length, prev_direction));
                length = 2;
                start_segment = prev_segment;
            }

            prev_direction = current_direction;
            prev_segment = current_segment;
        }

        draw_list.push(new BodySegment(start_segment, length, current_direction)) 
        this.draw_list = draw_list;
        console.log(draw_list);
    }

    draw_lines() {
        let current_line = this.draw_list[0];
        for (let i = 0; i < this.draw_list.length; i++) {
            current_line = this.draw_list[i];

            let box: HTMLElement = document.getElementById(`${current_line.start.x}_${current_line.start.y}`);

            box.appendChild()
        }
    }

    is_segment(x: number, y: number) {
        if (this.snake.slice(1).some(element => element.x === x && element.y === y)) {
            return "visible"
        } else {
            return "hidden"
        }
    }

    is_head(x: number, y: number) {
        let head = this.snake[0];
        if (head.x === x && head.y === y) {
            return "visible"
        } else {
            return "hidden"
        }
    }
}

class Cell {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class BodySegment {
    public start: Cell;
    public length: number;
    public direction: Direction;

    constructor(start: Cell, length: number, direction: Direction) {
        this.start = start;
        this.length = length;
        this.direction = direction;
    }
}
