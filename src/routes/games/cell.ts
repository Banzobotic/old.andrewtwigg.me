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

    constructor(type: CellType) {
        this.status = CellStatus.unClicked;
        this.type = type;
    }

    getStatusChar() {
        if (this.status == CellStatus.incorrect) {
            return "X"
        } else {
            return ""
        }
    }

    getStyle() {
        if (this.status == CellStatus.unClicked) {
            return "box-unClicked"
        } else {
            return `box-${this.type}`
        }
    }
}