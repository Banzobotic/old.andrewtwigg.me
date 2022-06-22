export { Cell, CellStatus, CellType }

enum CellStatus {
    unClicked = "unClicked",
    correct = "correct",
    incorrect = "incorrect",
}

enum CellType {
    goal = "goal",
    death = "death",
}

class Cell {
    status: CellStatus;
    type: CellType;

    constructor() {
        this.status = CellStatus.unClicked;
        this.type = Math.random() < 0.5 ? CellType.goal : CellType.death;
    }

    getStatusChar() {
        return this.status == CellStatus.incorrect ? "X" : "";
    }

    getStyle() {
        return this.status == CellStatus.unClicked ? "box-unClicked" : `box-${this.type}`
    }
}
