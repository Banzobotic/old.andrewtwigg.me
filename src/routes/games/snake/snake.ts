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
    private document: Document | null;
    public window: Window | null;
    private ctx: CanvasRenderingContext2D | null;
    private last_tick_start: number;

    constructor() {
        this.snake = [new Cell(3, 7), new Cell(4, 7), new Cell(5, 7), new Cell(5, 6), new Cell(5, 5), new Cell(4, 5), new Cell(3, 5), new Cell(3, 6)];
        this.moving = false;
        this.food = new Cell(10, 7);
        this.draw_list = [];
        this.document = null;
        this.window = null;
        this.ctx = null;
        this.last_tick_start = 0;
    }

    start() {
        this.moving = true;
        this.move();
    }

    move() {

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

        let tick_time = timestamp - this.last_tick_start;
        this.last_tick_start = timestamp;

        this.render();

        let snake = this;
        window.requestAnimationFrame(function(timestamp) {
            snake.game_loop(timestamp)
        })
    }

    render() {
        if (this.ctx == null) {
            console.error("Render called before canvas context creation");
            return;
        }

        this.ctx.clearRect(0, 0, 525, 525);
        this.draw_background()
        this.draw_snake()
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

        pattern_canvas.width = 70;
        pattern_canvas.height = 70;

        pattern_ctx.fillStyle = "#3eed52";
        pattern_ctx.fillRect(0, 0, 35, 35);
        pattern_ctx.fillRect(35, 35, 35, 35);
        pattern_ctx.fillStyle = "#31b540";
        pattern_ctx.fillRect(35, 0, 35, 35);
        pattern_ctx.fillRect(0,35, 35, 35);

        const pattern = this.ctx.createPattern(pattern_canvas, "repeat");
        
        if (pattern == null) {
            return;
        }

        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, 525, 525)
    }

    draw_snake() {
        if (this.ctx == null) {
            console.error("Snake drawn before canvas context instantiated");
            return;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.snake[0].x * 25, this.snake[0].y * 25);
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
