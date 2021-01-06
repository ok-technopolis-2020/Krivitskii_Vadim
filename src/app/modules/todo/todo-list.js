import {TodoElement} from "./todo-element";
import todoWrapper from "./todo-wrapper";

export class TodoList {

    idIterator = 1;

    #DOMElement
    #todoElements = [];

    constructor(DOMElement) {
        this.#DOMElement = DOMElement;
    }


    createElement(name) {
        const li = document.createElement("li");
        li.className = "todo-element_wrapper";
        li.id = `item_${this.idIterator++}`;

        const view = document.createElement("label");
        view.className = "todo-list_element";
        li.appendChild(view);

        const checkbox = document.createElement("input");
        checkbox.className = "todo-element_checkbox";
        checkbox.type = "checkbox";
        checkbox.setAttribute("aria-label", "Set as done");
        view.appendChild(checkbox);

        const custom_checkbox = document.createElement("span");
        custom_checkbox.className = "todo-element_check_box";
        view.appendChild(custom_checkbox);

        const text = document.createElement("span");
        text.className = "todo-element_name";
        view.appendChild(text);

        const textNode = document.createTextNode(name);
        text.appendChild(textNode);

        const delBtn = document.createElement("button");
        delBtn.className = "todo-element_delete";
        delBtn.setAttribute("aria-label", "Delete todo");
        view.appendChild(delBtn);

        delBtn.addEventListener("click", e => {
            const root = e.target.parentNode.parentNode;
            this.#DOMElement.removeChild(root);
            this.#todoElements = this.#todoElements.filter(item => item.id !== root.id);
            todoWrapper.decreaseCounter();
        })

        const todoElement = new TodoElement(li.id, li, name);
        this.#todoElements.push(todoElement);
        this.#DOMElement.appendChild(li);
        li.draggable = true;
        todoWrapper.increaseCounter();
        return todoElement;
    }

    get getTodoElements() {
        return this.#todoElements;
    }

    set setTodoElements(array) {
        this.#todoElements = array;
    }

    get DOMElement() {
        return this.#DOMElement;
    }
}