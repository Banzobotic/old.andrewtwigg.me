export { ID }

class ID {
    x: number;
    y: number;

    constructor(e) {
        let id = e.target.id.split("_")

        this.x = parseInt(id[0]);
        this.y = parseInt(id[1]);
    }
}
