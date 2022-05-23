export { Cell, CellStatus, CellType }

enum CellStatus {
    unClicked = "unClicked",
    correct = "correct",
    incorrect = "incorrect",
}

enum CellType {
    mine = "mine",
    empty = "empty",
}

class Cell {
    status: CellStatus;
    type: CellType;

    constructor() {
        this.status = CellStatus.unClicked;
        this.type = Math.random() < 0.5 ? CellType.mine : CellType.empty;
    }

    getStatusChar() {
        return this.status == CellStatus.incorrect ? "X" : "";
    }

    getStyle() {
        return this.status == CellStatus.unClicked ? "box-unClicked" : `box-${this.type}`
    }
}
