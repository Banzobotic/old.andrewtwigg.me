import chroma from "chroma-js";

export { Snake };

const GRID_SIZE = 15;
const BOX_SIZE = 35;

enum Direction {
    Right,
    Down,
    Left,
    Up,
}

enum TurnDir {
    Clockwise,
    AntiClockwise,
    Straight,
    Mirror,
}

function get_turn_dir(direction: Direction, prev_direction: Direction): TurnDir {
    if (direction == prev_direction) {
        return TurnDir.Straight
    } else if (direction == mod(prev_direction + 1, 4)) {
        return TurnDir.Clockwise
    } else if (direction == mod(prev_direction - 1, 4)) {
        return TurnDir.AntiClockwise
    } else {
        return TurnDir.Mirror
    }
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

class Snake {
    private snake: Array<Cell>;
    private moving: boolean;
    private direction: Direction;
    private food: Cell;
    private draw_list: Array<BodySegment>;
    private document: Document | null;
    public window: Window | null;
    private ctx: CanvasRenderingContext2D | null;
    private last_tick_start: number | null;
    private last_move: number | null;

    constructor() {
        this.snake = [new Cell(4, 8), new Cell(3, 8), new Cell(3, 7), new Cell(4, 7), new Cell(5, 7), new Cell(5, 6), new Cell(5, 5), new Cell(5, 4), new Cell(4, 4), new Cell(3, 4), new Cell(3, 5), new Cell(2, 5), new Cell(1, 5), new Cell(1, 4), new Cell(1, 3), new Cell(1, 2), new Cell(2, 2), new Cell(2, 3), new Cell(3, 3)];
        this.moving = false;
        this.direction = Direction.Right;
        this.food = new Cell(10, 7);
        this.draw_list = [];
        this.document = null;
        this.window = null;
        this.ctx = null;
        this.last_tick_start = null;
        this.last_move = null;
    }

    set_document_and_window(document: Document, window: Window) {
        this.document = document;
        this.window = window;
    }

    set_canvas() {
        if (this.document == null) {
            console.error("Called before document instantiated");
            return;
        }

        let canvas = this.document.getElementById("game_board");

        if (canvas == null) {
            console.error("Wrong canvas ID");
            return;
        }

        // @ts-ignore
        this.ctx = canvas.getContext("2d");
    }

    game_loop(timestamp: DOMHighResTimeStamp) {
        if (this.window == null) {
            console.error("Window not instantiated before game loop started")
            return;
        }
        if (this.last_tick_start == null || this.last_move == null) {
            this.last_tick_start = timestamp;
            this.last_move = timestamp;
        }

        let tick_time = timestamp - this.last_tick_start;
        let time_since_last_move = timestamp - this.last_move;
        this.last_tick_start = timestamp;

        // if (time_since_last_move > 500) {
        //     this.move();
        //     this.last_move = timestamp;
        // }
        
        this.render();

        let snake = this;
        window.requestAnimationFrame(function(timestamp) {
            snake.game_loop(timestamp)
        })
    }

    move() {
        let new_head: Cell;
        let current_head = this.snake[this.snake.length - 1];

        if (this.direction == Direction.Right) {
            new_head = new Cell(current_head.x + 1, current_head.y);
        } else if (this.direction == Direction.Left) {
            new_head = new Cell(current_head.x - 1, current_head.y);
        } else if (this.direction == Direction.Down) {
            new_head = new Cell(current_head.x, current_head.y + 1);
        } else {
            new_head = new Cell(current_head.x, current_head.y - 1);
        }

        this.snake.push(new_head);
        this.snake.shift();
    }

    render() {
        if (this.ctx == null) {
            console.error("Render called before canvas context creation");
            return;
        }

        this.ctx.clearRect(0, 0, GRID_SIZE * BOX_SIZE, GRID_SIZE * BOX_SIZE);
        this.draw_background();
        this.draw_snake();
    }

    draw_background() {
        if (this.document == null) {
            console.error("Called before document instantiated");
            return;
        }
        if (this.ctx == null) {
            console.error("Called before canvas instantiated");
            return;
        }

        const pattern_canvas = this.document.createElement("canvas");
        const pattern_ctx = pattern_canvas.getContext("2d");

        if (pattern_ctx == null) {
            return;
        }

        pattern_canvas.width = BOX_SIZE * 2;
        pattern_canvas.height = BOX_SIZE * 2;

        pattern_ctx.fillStyle = "#3eed52";
        pattern_ctx.fillRect(0, 0, BOX_SIZE, BOX_SIZE);
        pattern_ctx.fillRect(BOX_SIZE, BOX_SIZE, BOX_SIZE, BOX_SIZE);
        pattern_ctx.fillStyle = "#31b540";
        pattern_ctx.fillRect(BOX_SIZE, 0, BOX_SIZE, BOX_SIZE);
        pattern_ctx.fillRect(0,BOX_SIZE, BOX_SIZE, BOX_SIZE);

        const pattern = this.ctx.createPattern(pattern_canvas, "repeat");
        
        if (pattern == null) {
            return;
        }

        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, GRID_SIZE * BOX_SIZE, GRID_SIZE * BOX_SIZE)
    }

    // Still to do: rounded ends, decrease slope when certain length reached and only use part of the gradient until certain length reached
    // Also need to use contants for easier modification of values
    // Eventually will need to update to be able to handle smooth movement
    draw_snake() {
        function snake_direction(current_segment: Cell, prev_segment: Cell): Direction {
            if (current_segment.x - prev_segment.x > 0) {
                return Direction.Right;
            } else if (current_segment.x - prev_segment.x < 0) {
                return Direction.Left;
            } else if (current_segment.y - prev_segment.y > 0) {
                return Direction.Down;
            } else {
                return Direction.Up;
            }
        }

        if (this.ctx == null) {
            console.error("draw_snake called before canvas context instantiated");
            return;
        }

        this.ctx.lineWidth = 27;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        let direction = snake_direction(this.snake[1], this.snake[0]);
        let prev_direction = direction;

        let start: Cell;
        let end: Cell;
        "#1f87d1"
        "#0644af"

        let start_colour = "#670a58";
        let end_colour = "#0644af";

        let scale = chroma.scale(["#670a58", "#0644af"]).mode("lch");

        for (let i = 0; i < this.snake.length; i++) {
            prev_direction = direction;
            if (i != this.snake.length - 1) {
                direction = snake_direction(this.snake[i+1], this.snake[i]);
            }

            let turn = get_turn_dir(direction, prev_direction);

            if (turn == TurnDir.Straight) {
                let segment_x = this.snake[i].x * 35;
                let segment_y = this.snake[i].y * 35;

                let segment = new Path2D();

                let gradient = this.ctx.createLinearGradient(
                    segment_x, 
                    segment_y + 17.5, 
                    segment_x + 35, 
                    segment_y + 17.5,
                );
                
                gradient.addColorStop(0, scale(i / this.snake.length).hex());
                gradient.addColorStop(1, scale((i + 1) / this.snake.length).hex());

                segment.moveTo(segment_x, segment_y + (4 + (this.snake.length / 2 - i / 2)));
                segment.lineTo(segment_x, segment_y + 35 - (4 + (this.snake.length / 2 - i / 2)));
                segment.lineTo(segment_x + 35, segment_y + 35 - (4 + (this.snake.length / 2 - i / 2 - 0.5)));
                segment.lineTo(segment_x + 35, segment_y + (4 + (this.snake.length / 2 - i / 2 - 0.5)));
                
                segment.closePath();

                this.ctx.translate(segment_x + 17.5, segment_y + 17.5);
                this.ctx.rotate((Math.PI / 2) * direction);
                this.ctx.translate(-segment_x - 17.5, -segment_y - 17.5);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill(segment);

                this.ctx.resetTransform();
            } else if (turn == TurnDir.Clockwise) {
                let segment_x = this.snake[i].x * 35;
                let segment_y = this.snake[i].y * 35;

                let segment = new Path2D();

                let gradient = this.ctx.createLinearGradient(
                    segment_x + 17.5, 
                    segment_y + 35, 
                    segment_x + 35, 
                    segment_y + 17.5,
                );

                gradient.addColorStop(0, scale(i / this.snake.length).hex());
                gradient.addColorStop(1, scale((i + 1) / this.snake.length).hex());

                segment.moveTo(segment_x + (4 + (this.snake.length / 2 - i / 2)), segment_y + 35);
                segment.quadraticCurveTo(
                    segment_x + (4 + (this.snake.length / 2 - i / 2 - 0.5)), 
                    segment_y + (4 + (this.snake.length / 2 - i / 2 - 0.5)),
                    segment_x + 35,
                    segment_y + (4 + (this.snake.length / 2 - i / 2 - 0.5))
                )
                segment.lineTo(segment_x + 35, segment_y + 35 - (4 + (this.snake.length / 2 - i / 2 - 0.5)));
                segment.quadraticCurveTo(
                    segment_x + 35 - (4 + (this.snake.length / 2 - i / 2)),
                    segment_y + 35 - (4 + (this.snake.length / 2 - i / 2)),
                    segment_x + 35 - (4 + (this.snake.length / 2 - i / 2)),
                    segment_y + 35
                )
                
                segment.closePath();

                this.ctx.translate(segment_x + 17.5, segment_y + 17.5);

                this.ctx.rotate((Math.PI / 2) * direction);

                this.ctx.translate(-segment_x - 17.5, -segment_y - 17.5);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill(segment);

                this.ctx.resetTransform();
            } else if (turn == TurnDir.AntiClockwise) {
                let segment_x = this.snake[i].x * 35;
                let segment_y = this.snake[i].y * 35;

                let segment = new Path2D();

                let gradient = this.ctx.createLinearGradient(
                    segment_x + 17.5, 
                    segment_y, 
                    segment_x + 35, 
                    segment_y + 17.5,
                );

                gradient.addColorStop(0, scale(i / this.snake.length).hex());
                gradient.addColorStop(1, scale((i + 1) / this.snake.length).hex());

                segment.moveTo(segment_x + (4 + (this.snake.length / 2 - i / 2)), segment_y);
                segment.quadraticCurveTo(
                    segment_x + (4 + (this.snake.length / 2 - i / 2 - 0.5)), 
                    segment_y + 35 - (4 + (this.snake.length / 2 - i / 2 - 0.5)),
                    segment_x + 35,
                    segment_y + 35 - (4 + (this.snake.length / 2 - i / 2 - 0.5))
                );
                segment.lineTo(segment_x + 35, segment_y + (4 + (this.snake.length / 2 - i / 2 - 0.5)));
                segment.quadraticCurveTo(
                    segment_x + 35 - (4 + (this.snake.length / 2 - i / 2)),
                    segment_y + (4 + (this.snake.length / 2 - i / 2)),
                    segment_x + 35 - (4 + (this.snake.length / 2 - i / 2)),
                    segment_y
                );
                
                segment.closePath();

                this.ctx.translate(segment_x + 17.5, segment_y + 17.5);

                this.ctx.rotate((Math.PI / 2) * direction);

                this.ctx.translate(-segment_x - 17.5, -segment_y - 17.5);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill(segment);

                this.ctx.resetTransform();
            } else {
                console.error("snake just went inside itself wtf");
                return;
            }
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
