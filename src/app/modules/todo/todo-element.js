import todoWrapper, {TodoWrapper} from "./todo-wrapper";

export class TodoElement {

    #id
    #name;
    #isCompleted;

    // DOM
    #rootElement;

    constructor(id, DOMElement, name, isCompleted) {
        this.#id = id;
        this.#rootElement = DOMElement;
        this.#name = name;
        this.#isCompleted = isCompleted;
        this.#rootElement = DOMElement;
        this.#isCompleted = isCompleted;
        this.#initEvent();
    }

    #initEvent() {
        this.#rootElement.addEventListener("change", e => {
                const value = e.target.checked;
                this.#isCompleted = value
                if (value === true) {
                    todoWrapper.decreaseCounter();
                    if (TodoWrapper.categoryState === TodoWrapper.CATEGORY_ACTIVE) {
                        this.#rootElement.hidden = true;
                    }
                } else {
                    if (TodoWrapper.categoryState === TodoWrapper.CATEGORY_COMPLETED) {
                        this.#rootElement.hidden = true;
                    }
                    todoWrapper.increaseCounter();
                }
            }
        )
    }

    get rootElement() {
        return this.#rootElement;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get isCompleted() {
        return this.#isCompleted;
    }


    set isCompleted(value) {
        this.#rootElement.querySelector(".todo-element_checkbox").checked = value;
        this.#isCompleted = value;
    }

    destroyElement() {
        this.#rootElement.parentElement.removeChild(this.#rootElement);
    }
}