export class TodoElement {

    #name;
    #isCompleted = false;
    #isVisible = true;

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.name;
    }

    testNow() {
        alert(this.#name);
    }
}