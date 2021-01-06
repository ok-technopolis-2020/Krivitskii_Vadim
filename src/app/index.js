import "./styles/styles.css";
import todoWrapper from "./modules/todo/todo-wrapper";



/* Drag System */

const todoList = todoWrapper.todoList.DOMElement;

todoList.addEventListener("dragstart", (e) => {
    e.target.classList.add("selected");
})
todoList.addEventListener("dragend", (e) => {
    e.target.classList.remove("selected");
})

todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const currentSelected = document.querySelector(".selected");
    const currentElement = e.target;
    const isMoveable = currentSelected !== currentElement && currentElement.classList.contains("todo-list_element");
    if (!isMoveable)
        return;
    const nextElement = getNextElement(e.clientY, currentElement);
    if (nextElement == null)
        return;
    if (nextElement && currentSelected === nextElement.previousElementSibling || currentSelected === nextElement) {
        return;
    }
    todoList.insertBefore(currentSelected, nextElement.parentNode);
})

const getNextElement = (cursorPos, currentElement) => {
    const currentElementPos = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementPos.y + currentElementPos.height / 2;
    return (cursorPos < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
}