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
