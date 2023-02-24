export { Snake };

const GRID_SIZE = 15;
const BOX_SIZE = 35;

enum Direction {
    Up,
    Right,
    Down,
    Left,
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
        this.snake = [new Cell(3, 7), new Cell(4, 7), new Cell(5, 7), new Cell(5, 6), new Cell(5, 5), new Cell(5, 4), new Cell(4, 4), new Cell(3, 4), new Cell(3, 5), new Cell(2, 5), new Cell(1, 5), new Cell(1, 4), new Cell(1, 3), new Cell(1, 2)];
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

        if (time_since_last_move > 500) {
            this.move();
            this.last_move = timestamp;
        }
        
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
                if (prev_direction == Direction.Right || prev_direction == Direction.Down) {
                    draw_list.push(new BodySegment(start_segment, length, prev_direction));
                } else {
                    draw_list.push(new BodySegment(prev_segment, length, prev_direction));
                }
                
                length = 2;
                start_segment = prev_segment;
            }

            prev_direction = current_direction;
            prev_segment = current_segment;
        }

        if (prev_direction == Direction.Right || prev_direction == Direction.Down) {
            draw_list.push(new BodySegment(start_segment, length, prev_direction));
        } else {
            draw_list.push(new BodySegment(prev_segment, length, prev_direction));
        }

        this.draw_list = draw_list;
        console.log(draw_list);
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

    draw_snake() {
        function snake_direction(new_segment: Cell, prev_segment: Cell): Direction {
            if (new_segment.x - prev_segment.x > 0) {
                return Direction.Right;
            } else if (new_segment.x - prev_segment.x < 0) {
                return Direction.Left;
            } else if (new_segment.y - prev_segment.y > 0) {
                return Direction.Down;
            } else {
                return Direction.Up;
            }
        }

        if (this.ctx == null) {
            console.error("Snake drawn before canvas context instantiated");
            return;
        }

        let snake = new Path2D();
        let current_segment = this.snake[0];
        let direction = snake_direction(this.snake[1], current_segment);
        let prev_direction: Direction;
        let x_position = 0;
        let y_position = 0;

        if (direction == Direction.Right) {
            x_position = current_segment.x * BOX_SIZE;
            y_position = current_segment.y * BOX_SIZE;
        } else if (direction == Direction.Down) {
            x_position = (current_segment.x + 1) * BOX_SIZE;
            y_position = current_segment.y * BOX_SIZE;
        } else if (direction == Direction.Up) {
            x_position = current_segment.x * BOX_SIZE;
            y_position = (current_segment.y + 1) * BOX_SIZE;
        } else {
            x_position = (current_segment.x + 1) * BOX_SIZE;
            y_position = (current_segment.y + 1) * BOX_SIZE;
        }
        snake.moveTo(x_position, y_position);
        this.ctx.beginPath();
        this.ctx.moveTo(x_position, y_position);

        let top_edge: boolean = true;

        let i = 0;

        while (true) {
            current_segment = this.snake[i];
            prev_direction = direction;
            if (top_edge) {
                direction = snake_direction(this.snake[i+1], current_segment);
            } else {
                direction = snake_direction(this.snake[i-1], current_segment);
            }

            let turn_dir = get_turn_dir(direction, prev_direction);

            console.log(`current_segment: (${current_segment.x}, ${current_segment.y})\ndirection: ${direction}\nprev_direction: ${prev_direction}\nturn_dir: ${turn_dir}\ntop_edge: ${top_edge}`)
            
            if (turn_dir == TurnDir.Straight) {
                if (direction == Direction.Right) {
                    x_position += BOX_SIZE;
                } else if (direction == Direction.Left) {
                    x_position -= BOX_SIZE;
                } else if (direction == Direction.Down) {
                    y_position += BOX_SIZE;
                } else {
                    y_position -= BOX_SIZE;
                }
                snake.lineTo(x_position, y_position);
                this.ctx.lineTo(x_position, y_position);
            } else if (turn_dir == TurnDir.Clockwise) {
                if (prev_direction == Direction.Right) {
                    x_position += BOX_SIZE;
                } else if (prev_direction == Direction.Left) {
                    x_position -= BOX_SIZE;
                } else if (prev_direction == Direction.Down) {
                    y_position += BOX_SIZE;
                } else {
                    y_position -= BOX_SIZE;
                }
                snake.lineTo(x_position, y_position);
                this.ctx.lineTo(x_position, y_position);

                if (direction == Direction.Right) {
                    x_position += BOX_SIZE;
                } else if (direction == Direction.Left) {
                    x_position -= BOX_SIZE;
                } else if (direction == Direction.Down) {
                    y_position += BOX_SIZE;
                } else {
                    y_position -= BOX_SIZE;
                }
                snake.lineTo(x_position, y_position);
                this.ctx.lineTo(x_position, y_position);
            } 

            if (top_edge) {
                if (i == this.snake.length - 2) {
                    top_edge = false;
                    
                    for (let j = 0; j <= 2; j++) {
                        let shift_dir = mod(direction + j, 4);

                        if (shift_dir == Direction.Right) {
                            x_position += BOX_SIZE;
                        } else if (shift_dir == Direction.Left) {
                            x_position -= BOX_SIZE;
                        } else if (shift_dir == Direction.Down) {
                            y_position += BOX_SIZE;
                        } else {
                            y_position -= BOX_SIZE;
                        }
                        snake.lineTo(x_position, y_position);
                        this.ctx.lineTo(x_position, y_position);
                    }

                    direction = (direction + 2) % 4;
                } else {
                    i += 1;
                }
            } else {
                i -= 1;
                if (i == 0) {
                    for (let j = 0; j <= 1; j++) {
                        let shift_dir = mod(direction + j, 4);

                        if (shift_dir == Direction.Right) {
                            x_position += BOX_SIZE;
                        } else if (shift_dir == Direction.Left) {
                            x_position -= BOX_SIZE;
                        } else if (shift_dir == Direction.Down) {
                            y_position += BOX_SIZE;
                        } else {
                            y_position -= BOX_SIZE;
                        }
                        snake.lineTo(x_position, y_position);
                        this.ctx.lineTo(x_position, y_position);
                    }

                    break;
                }
            }
        }

        snake.closePath();
        this.ctx.fillStyle = "blue";
        this.ctx.fill(snake);
        // this.ctx.strokeStyle = "red";
        // this.ctx.lineWidth = 10;
        // this.ctx.stroke();
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
