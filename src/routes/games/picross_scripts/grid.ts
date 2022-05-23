import { Cell, CellStatus } from "./cell"
import type { ID } from "./id"

export { Grid }

class Grid {
    grid: Array<Array<Cell>>

    constructor() {
        this.grid = [];
        for (let i = 0; i < 10; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 10; j++) {
                this.grid[i].push(new Cell);
            }
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
}
