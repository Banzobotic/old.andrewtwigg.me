import chroma from "chroma-js";
import { xlink_attr } from "svelte/internal";

export { Snake };

// Remember to change canvas width and height after adjusting
const GRID_HEIGHT = 15;
const GRID_WIDTH = 17;

const BOX_SIZE = 35;
const HALF_BOX_SIZE = BOX_SIZE / 2;

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
    private snake: Array<SnakeSegment>;
    private moving: boolean;
    private direction: Direction;
    private food: Coordinate;
    private draw_list: Array<BodySegment>;
    private document: Document | null;
    public window: Window | null;
    private ctx: CanvasRenderingContext2D | null;
    private last_tick_start: number | null;
    private last_move: number | null;
    private time_step: number;
    private inputs: Array<Direction>;

    constructor() {
        this.snake = [new SnakeSegment(4, 8), new SnakeSegment(3, 8), new SnakeSegment(3, 7), new SnakeSegment(4, 7), new SnakeSegment(5, 7), new SnakeSegment(5, 6), new SnakeSegment(5, 5), new SnakeSegment(5, 4), new SnakeSegment(4, 4), new SnakeSegment(3, 4), new SnakeSegment(3, 5), new SnakeSegment(2, 5), new SnakeSegment(1, 5), new SnakeSegment(1, 4), new SnakeSegment(1, 3), new SnakeSegment(1, 2), new SnakeSegment(2, 2), new SnakeSegment(2, 3), new SnakeSegment(3, 3)];
        this.moving = false;
        this.direction = Direction.Right;
        this.food = new Coordinate(10, 7);
        this.draw_list = [];
        this.document = null;
        this.window = null;
        this.ctx = null;
        this.last_tick_start = null;
        this.last_move = null;
        this.time_step = 0;
        this.inputs = [];
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

    on_key_down(event: KeyboardEvent) {
        if (this.inputs.length >= 3) {
            return;
        }

        let input_dir: Direction;

        if (event.key == "ArrowDown" || event.key == "S") {
            input_dir = Direction.Down;
        } else if (event.key == "ArrowUp" || event.key == "W") {
            input_dir = Direction.Up;
        } else if (event.key == "ArrowLeft" || event.key == "A") {
            input_dir = Direction.Left;
        } else if (event.key == "ArrowRight" || event.key == "D") {
            input_dir = Direction.Right;
        } else {
            return;
        }

        if (this.inputs.length === 0 && input_dir % 2 !== this.direction % 2) {
            this.inputs.push(input_dir);  
        } else if (this.inputs.length !== 0 && this.inputs[this.inputs.length - 1] % 2 !== input_dir % 2) {
            this.inputs.push(input_dir);
        }
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

        if (time_since_last_move > 150) {
            this.move();
            this.last_move = timestamp;
            this.time_step = 0;
        } else {
            this.time_step = time_since_last_move / 150;
        }
        
        this.render();

        let snake = this;
        window.requestAnimationFrame(function(timestamp) {
            snake.game_loop(timestamp)
        })
    }

    move() {
        let new_head: SnakeSegment;
        let current_head = this.snake[this.snake.length - 1];

        if (this.inputs.length !== 0) {
            this.direction = this.inputs[0];
            this.inputs.shift();
        }

        if (this.direction == Direction.Right) {
            new_head = new SnakeSegment(current_head.x + 1, current_head.y);
        } else if (this.direction == Direction.Left) {
            new_head = new SnakeSegment(current_head.x - 1, current_head.y);
        } else if (this.direction == Direction.Down) {
            new_head = new SnakeSegment(current_head.x, current_head.y + 1);
        } else {
            new_head = new SnakeSegment(current_head.x, current_head.y - 1);
        }

        this.snake.push(new_head);
        this.snake.shift();
    }

    render() {
        if (this.ctx == null) {
            console.error("Render called before canvas context creation");
            return;
        }

        this.ctx.clearRect(0, 0, GRID_WIDTH * BOX_SIZE, GRID_HEIGHT * BOX_SIZE);
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
        this.ctx.fillRect(0, 0, GRID_WIDTH * BOX_SIZE, GRID_HEIGHT * BOX_SIZE)
    }

    // Still to do: only use part of the gradient until certain length reached
    // Eventually will need to update to be able to handle smooth movement
    // Need to smoothly shift gradient
    // Probably need to change to have head of block that starts at length 0 then goes to length 1 rather than starting at length 1 and stretching to length 2
    // Need to change tail animation to use one bezier curve and trig rather than two bezier curves
    draw_snake() {
        function snake_direction(current_segment: SnakeSegment, prev_segment: SnakeSegment): Direction {
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

        function bezier_curve(start_x: number, start_y: number, control_x: number, control_y: number, end_x: number, end_y: number, t: number): Coordinate {
            return new Coordinate(
                Math.pow(1 - t, 2) * start_x +
                    2 * (1 - t) * t * control_x +
                    Math.pow(t, 2) * end_x,
                Math.pow(1 - t, 2) * start_y +
                    2 * (1 - t) * t * control_y +
                    Math.pow(t, 2) * end_y,
            );
        }

        function angle_on_curve(start_x: number, start_y: number, control_x: number, control_y: number, end_x: number, end_y: number, t: number): number {
            let x0 = start_x + (control_x - start_x) * t;
            let y0 = start_y + (control_y - start_y) * t;
            let x1 = control_x + (end_x - control_x) * t;
            let y1 = control_y + (end_y - control_y) * t;
            return Math.atan2((y1 - y0), (x1 - x0)) + Math.PI / 2;
        }

        function offset_points_at_angle(angle: number, point: Coordinate, offset: number): Coordinate {
            return new Coordinate(point.x + offset * Math.cos(angle), point.y + offset * Math.sin(angle));
        }

        if (this.ctx == null) {
            console.error("draw_snake called before canvas context instantiated");
            return;
        }

        let direction = snake_direction(this.snake[1], this.snake[0]);
        let prev_direction = direction;

        const MAX_SNAKE_WIDTH = 25;
        const MIN_SNAKE_WIDTH = 10;
        const MAX_SNAKE_WIDTH_DECREASE = 0.6 / 2;

        const SNAKE_WIDTH_DECREASE = 
            MAX_SNAKE_WIDTH_DECREASE * this.snake.length > MAX_SNAKE_WIDTH - MIN_SNAKE_WIDTH ? 
            (MAX_SNAKE_WIDTH - MIN_SNAKE_WIDTH) / this.snake.length : 
            MAX_SNAKE_WIDTH_DECREASE;

        const MIN_GAP_TO_EDGE = (BOX_SIZE - MAX_SNAKE_WIDTH) / 2;

        let scale = chroma.scale(["#670a58", "#0644af"]).mode("lch");

        for (let i = 0; i < this.snake.length; i++) {
            prev_direction = direction;
            if (i != this.snake.length - 1) {
                direction = snake_direction(this.snake[i+1], this.snake[i]);
            }

            let turn: TurnDir;
            let recorded_turn = this.snake[i].turn_dir;

            if (recorded_turn == TurnDir.Straight) {
                turn = get_turn_dir(direction, prev_direction);
                this.snake[i].turn_dir = turn;
            } else if (recorded_turn == null)  {
                turn = get_turn_dir(direction, prev_direction);
                this.snake[i].turn_dir = turn;
            } else {
                turn = recorded_turn;
            }

            if (turn == TurnDir.Straight) {
                let segment_x = this.snake[i].x * BOX_SIZE;
                let segment_y = this.snake[i].y * BOX_SIZE;

                let curved_end_x = 0;
                let curved_end_y = 0;

                let segment = new Path2D();
                let curved_end = new Path2D();

                let gradient = this.ctx.createLinearGradient(
                    segment_x, 
                    segment_y + HALF_BOX_SIZE, 
                    segment_x + BOX_SIZE, 
                    segment_y + HALF_BOX_SIZE,
                );
                
                gradient.addColorStop(0, scale(i / this.snake.length).hex());
                gradient.addColorStop(1, scale((i + 1) / this.snake.length).hex());

                if (i == 0) {
                    segment.moveTo(segment_x + BOX_SIZE * this.time_step, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE * this.time_step, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                } else if (i == this.snake.length - 1) {
                    segment.moveTo(segment_x, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE + BOX_SIZE * this.time_step, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE + BOX_SIZE * this.time_step, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                } else {
                    segment.moveTo(segment_x, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                }

                segment.closePath();

                if (i == 0) {
                    if (direction == Direction.Left) {
                        curved_end_x = segment_x + BOX_SIZE - BOX_SIZE * this.time_step;
                        curved_end_y = segment_y + HALF_BOX_SIZE;
                    } else if (direction == Direction.Right) {
                        curved_end_x = segment_x + BOX_SIZE * this.time_step;
                        curved_end_y = segment_y + HALF_BOX_SIZE;
                    } else if (direction == Direction.Up) {
                        curved_end_x = segment_x + HALF_BOX_SIZE;
                        curved_end_y = segment_y + BOX_SIZE - BOX_SIZE * this.time_step;
                    } else {
                        curved_end_x = segment_x + HALF_BOX_SIZE;
                        curved_end_y = segment_y + BOX_SIZE * this.time_step;
                    }

                    curved_end.arc(curved_end_x, curved_end_y, (MAX_SNAKE_WIDTH - 0.5 - SNAKE_WIDTH_DECREASE * this.snake.length * 2) / 2, 0, Math.PI * 2);

                    if ((MAX_SNAKE_WIDTH - SNAKE_WIDTH_DECREASE * this.snake.length * 2) < MIN_SNAKE_WIDTH) {
                        console.error(`Something wrong with SNAKE_WIDTH_DECREASE, end width is ${MAX_SNAKE_WIDTH - SNAKE_WIDTH_DECREASE * this.snake.length * 2}`)
                    }
                } else if (i == this.snake.length - 1) {
                    if (direction == Direction.Right) {
                        curved_end_x = segment_x + BOX_SIZE + BOX_SIZE * this.time_step;
                        curved_end_y = segment_y + HALF_BOX_SIZE;
                    } else if (direction == Direction.Left) {
                        curved_end_x = segment_x - BOX_SIZE * this.time_step;
                        curved_end_y = segment_y + HALF_BOX_SIZE;
                    } else if (direction == Direction.Down) {
                        curved_end_x = segment_x + HALF_BOX_SIZE;
                        curved_end_y = segment_y + BOX_SIZE + BOX_SIZE * this.time_step;
                    } else {
                        curved_end_x = segment_x + HALF_BOX_SIZE;
                        curved_end_y = segment_y - BOX_SIZE * this.time_step;
                    }

                    curved_end.arc(curved_end_x, curved_end_y, MAX_SNAKE_WIDTH / 2, 0, Math.PI * 2)
                }

                this.ctx.translate(segment_x + HALF_BOX_SIZE, segment_y + HALF_BOX_SIZE);
                this.ctx.rotate((Math.PI / 2) * direction);
                this.ctx.translate(-segment_x - HALF_BOX_SIZE, -segment_y - HALF_BOX_SIZE);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill(segment);
                
                this.ctx.resetTransform();

                this.ctx.fill(curved_end);
            } else if (turn == TurnDir.Clockwise || turn == TurnDir.AntiClockwise) {
                let segment_x = this.snake[i].x * BOX_SIZE;
                let segment_y = this.snake[i].y * BOX_SIZE;

                let segment = new Path2D();
                let curved_end = new Path2D();

                let gradient = this.ctx.createLinearGradient(
                    segment_x + HALF_BOX_SIZE, 
                    segment_y + BOX_SIZE, 
                    segment_x + BOX_SIZE, 
                    segment_y + HALF_BOX_SIZE,
                );

                gradient.addColorStop(0, scale(i / this.snake.length).hex());
                gradient.addColorStop(1, scale((i + 1) / this.snake.length).hex());

                let snake_end = bezier_curve(
                    segment_x + HALF_BOX_SIZE,
                    segment_y + BOX_SIZE,
                    segment_x + HALF_BOX_SIZE,
                    segment_y + HALF_BOX_SIZE,
                    segment_x + BOX_SIZE,
                    segment_y + HALF_BOX_SIZE,
                    this.time_step,
                )

                let snake_end_angle = angle_on_curve(
                    segment_x + HALF_BOX_SIZE,
                    segment_y + BOX_SIZE,
                    segment_x + HALF_BOX_SIZE,
                    segment_y + HALF_BOX_SIZE,
                    segment_x + BOX_SIZE,
                    segment_y + HALF_BOX_SIZE,
                    this.time_step,
                )

                let end_1_new = offset_points_at_angle(
                    snake_end_angle, 
                    snake_end, 
                    (MAX_SNAKE_WIDTH - 1 - SNAKE_WIDTH_DECREASE * this.snake.length * 2) * -0.5
                );

                let end_2_new = offset_points_at_angle(
                    snake_end_angle, 
                    snake_end, 
                    (MAX_SNAKE_WIDTH - 1 - SNAKE_WIDTH_DECREASE * this.snake.length * 2) * 0.5
                );

                if (i == 0) {
                    segment.moveTo(end_1_new.x, end_1_new.y);
                    segment.quadraticCurveTo(
                        segment_x + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE) + (BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE)) * this.time_step, 
                        segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE),
                        segment_x + BOX_SIZE,
                        segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE)
                    )
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.quadraticCurveTo(
                        segment_x + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE) + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE) * this.time_step,
                        segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE),
                        end_2_new.x,
                        end_2_new.y,
                    )
                } else {
                    segment.moveTo(segment_x + (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE), segment_y + BOX_SIZE);
                    segment.quadraticCurveTo(
                        segment_x + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE), 
                        segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE),
                        segment_x + BOX_SIZE,
                        segment_y + (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE)
                    )
                    segment.lineTo(segment_x + BOX_SIZE, segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i - 1 + this.time_step) * SNAKE_WIDTH_DECREASE));
                    segment.quadraticCurveTo(
                        segment_x + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE),
                        segment_y + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE),
                        segment_x + BOX_SIZE - (MIN_GAP_TO_EDGE + (this.snake.length - i + this.time_step) * SNAKE_WIDTH_DECREASE),
                        segment_y + BOX_SIZE
                    )
                }

                if (i == 0) {
                    curved_end.arc(snake_end.x, snake_end.y, (MAX_SNAKE_WIDTH - 0.5 - SNAKE_WIDTH_DECREASE * this.snake.length * 2) / 2, 0, Math.PI * 2)
                }
                
                segment.closePath();

                this.ctx.translate(segment_x + HALF_BOX_SIZE, segment_y + HALF_BOX_SIZE);

                if (turn == TurnDir.Clockwise) {
                    this.ctx.rotate((Math.PI / 2) * direction);
                } else {
                    this.ctx.rotate(Math.PI / 4);
                    this.ctx.scale(-1, 1);
                    this.ctx.rotate(Math.PI / 4 * 5)
                    this.ctx.rotate(-Math.PI / 2 * direction);
                }

                this.ctx.translate(-segment_x - HALF_BOX_SIZE, -segment_y - HALF_BOX_SIZE);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill(curved_end);
                this.ctx.fill(segment);

                this.ctx.resetTransform();
            } else {
                console.error("snake just went inside itself wtf");
                return;
            }
        }
    }
}

class Coordinate {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class SnakeSegment {
    public x: number;
    public y: number;
    public turn_dir: number | null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.turn_dir = null;
    }
}

class BodySegment {
    public start: Coordinate;
    public length: number;
    public direction: Direction;

    constructor(start: Coordinate, length: number, direction: Direction) {
        this.start = start;
        this.length = length;
        this.direction = direction;
    }
}
