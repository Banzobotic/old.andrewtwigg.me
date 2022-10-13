import { Cell, CellStatus, CellType } from "./cell"
import type { ID } from "./id"

export { Grid }

class Grid {
    private grid: Array<Array<Cell>>;
    size: number
    column_positions: Array<Array<string>>;
    row_positions: Array<Array<string>>;

    constructor(size: number) {
        this.size = size;

        let sum;
        let count;
        let total;

        // do {
            this.grid = [];
            for (let i = 1; i <= this.size; i++) {
                this.grid[i] = [];
                for (let j = 1; j <= this.size; j++) {
                    this.grid[i][j] = new Cell;
                }
            }

            this.column_positions = [];
            for (let i = 1; i <= this.size; i++) {
                this.column_positions[i] = this.getPositionsInColumn(i);
            }

            this.row_positions = [];
            for (let i = 1; i <= this.size; i++) {
                this.row_positions[i] = this.getPositionsInRow(i);
            }

            // Check board difficulty
            sum = 0;
            count = 0;
            total = 0;

            for (let i = 1; i <= 10; i++) {
                for (let j = 0; j <= 4; j++) {
                    let num1 = this.get_int(this.column_positions[i][j]);
                    let num2 = this.get_int(this.row_positions[i][j]);

                    sum += num1;

                    if (num1 !== 0) {
                        count += 1;
                        total += num1;
                    }
                    if (num2 !== 0) {
                        count += 1;
                        total += num2;
                    }
                }
            }

            console.log(sum);
            console.log(total / count);
            console.log(sum * (total / count))
        // } while (sum * (total / count) < 100)
    }

    private get_int(n: string) {
        let number = parseInt(n);
        if (isNaN(number)) {
            return 0;
        }
        return number;
    }

    at_id(id: ID) {
        return this.grid[id.y][id.x]
    }

    at(x: number, y: number) {
        return this.grid[y][x]
    }

    setStatus(id: ID, status: CellStatus) {
        this.grid[id.y][id.x].status = status;
    }

    getPositionsInColumn(column: number): Array<string> {
        let count = 0;
        let positions: Array<string> = [];

        for (let i = 1; i <= this.size; i++) {
            if (this.grid[i][column].type == CellType.goal) {
                count += 1;
            } else if (count != 0) {
                positions.push(count.toString());
                count = 0;
            }
        }

        if (count != 0) {
            positions.push(count.toString());
        }

        positions = positions.reverse();

        while (positions.length < 5) {
            positions.push("  ");
        }

        return positions;
    }

    getPositionsInRow(row: number): Array<string> {
        let count = 0;
        let positions: Array<string> = [];

        for (let i = 1; i <= this.size; i++) {
            if (this.grid[row][i].type == CellType.goal) {
                count += 1;
            } else if (count != 0) {
                positions.push(count.toString());
                count = 0;
            }
        }

        if (count != 0) {
            positions.push(count.toString());
        }

        positions = positions.reverse();

        while (positions.length < 5) {
            positions.push("  ");
        }

        return positions;
    }
}
