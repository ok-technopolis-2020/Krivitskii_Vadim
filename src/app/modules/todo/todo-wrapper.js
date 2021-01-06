import {TodoList} from "./todo-list";
import {LangUtil} from "../util/lang";

export class TodoWrapper {

    static itemsLeft = 0;

    #_todoList;

    // DOM
    #_clearCompletedBtnDOM;
    #_inputDOM;
    #_selectAllBtnDOM;
    #_itemsLeftDOM;

    // Categories
    static CATEGORY_ALL = 0;
    static CATEGORY_ACTIVE = 1;
    static CATEGORY_COMPLETED = 2;

    static categoryState = this.CATEGORY_ALL;

    constructor() {
        this.#init();
    }

    #init() {
        this.#_todoList = new TodoList(document.querySelector(".todo-list"))
        this.#_clearCompletedBtnDOM = document.querySelector(".clear-completed-btn");
        this.#_inputDOM = document.querySelector(".todo-creator_input");
        this.#_selectAllBtnDOM = document.querySelector(".todo-creator_button");
        this.#_itemsLeftDOM = document.querySelector(".items-left");
        this.#initInput();
        this.#initClearCompleted();
        this.#initSelectAll()
        this.#initChangeCategory();
    }

    #initInput() {
        const form = document.querySelector(".todo-creator_form");
        form.addEventListener("submit", e => {
            const text = this.#_inputDOM.value;
            e.preventDefault();
            if (!text) {
                alert("Input can not be empty")
            } else {
                this.#_todoList.createElement(text);
                this.#_inputDOM.value = "";
            }
        })
    }

    #initSelectAll() {
        this.#_selectAllBtnDOM.addEventListener("click", () => {
            this.#_todoList.getTodoElements.forEach(item => item.isCompleted = true)
            this.#updateCounter();
        })

    }

    #initClearCompleted() {
        this.clearCompletedBtnDOM.addEventListener("click", () => {
            this.clearCompleted();
        })
    }

    #initChangeCategory() {
        document.getElementById("all").addEventListener("click", () => {
            this.#getCategoryElements(TodoWrapper.CATEGORY_ALL);
        })
        document.getElementById("active").addEventListener("click", () => {
            this.#getCategoryElements(TodoWrapper.CATEGORY_ACTIVE);
        })
        document.getElementById("completed").addEventListener("click", () => {
            this.#getCategoryElements(TodoWrapper.CATEGORY_COMPLETED);
        })
    }

    #getCategoryElements(category) {
        const list = this.#_todoList.getTodoElements;
        const size = list.length;
        switch (category) {
            case (TodoWrapper.CATEGORY_ALL):
                TodoWrapper.categoryState = TodoWrapper.CATEGORY_ALL;
                for (let i = 0; i < size; i++) {
                    list[i].rootElement.hidden = false;
                }
                break;
            case (TodoWrapper.CATEGORY_ACTIVE):
                TodoWrapper.categoryState = TodoWrapper.CATEGORY_ACTIVE;
                for (let i = 0; i < size; i++) {
                    list[i].rootElement.hidden = list[i].rootElement.querySelector(".todo-element_checkbox").checked;
                }
                break;
            case (TodoWrapper.CATEGORY_COMPLETED):
                TodoWrapper.categoryState = TodoWrapper.CATEGORY_COMPLETED;
                for (let i = 0; i < size; i++) {
                    list[i].rootElement.hidden = !list[i].rootElement.querySelector(".todo-element_checkbox").checked;
                }
                break;
        }
        this.#updateCounter();
    }

    clearCompleted() {
        const tempTodoList = [];
        const list = this.#_todoList.getTodoElements;
        const size = list.length;
        for (let i = 0; i < size; i++) {
            const element = list[i];
            const isCompleted = element.rootElement.querySelector(".todo-element_checkbox").checked
            if (isCompleted) {
                element.destroyElement();
            } else {
                tempTodoList.push(element)
            }
        }
        this.decreaseCounter(this.#_todoList.getTodoElements.length - tempTodoList.length)
        this.#_todoList.setTodoElements = tempTodoList;
    }

    increaseCounter(amount) {
        if (amount === undefined) {
            amount = 1;
        }
        TodoWrapper.itemsLeft += amount;
        this.#updateCounter();
    }

    decreaseCounter(amount) {
        if (amount === undefined) {
            amount = 1;
        }
        TodoWrapper.itemsLeft -= amount;
        this.#updateCounter();
    }

    #updateCounter() {
        let left = 0;
        this.#_todoList.getTodoElements.forEach(element => {
            if (!element.rootElement.querySelector(".todo-element_checkbox").checked) {
                left++;
            }
        })
        TodoWrapper.itemsLeft = left;
        this.#_itemsLeftDOM.innerHTML = LangUtil.getItemsLeftMsg(left);

    }

    get todoList() {
        return this.#_todoList;
    }

    get clearCompletedBtnDOM() {
        return this.#_clearCompletedBtnDOM;
    }

}

const todoWrapper = new TodoWrapper();

export default todoWrapper;