const itemsLeft = document.getElementsByClassName("items-left")[0];
const input = document.getElementById("todo-creator_input");
let elements = document.querySelectorAll(".todo-list > li");

init()

function init() {
    itemsLeft.innerText = elements.length + " items left";
    initDelBtns();
    initInput();
    initClearBtn();
    initAddBtn();
    initCategories();
}

function updateElements() {
    elements = document.querySelectorAll(".todo-list > li");
    for (const element of elements) {
        element.draggable = true;
    }
    updateCounter();
}

function updateCounter() {
    let amount = 0;
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].hidden) {
            amount++;
        }
    }
    itemsLeft.innerText = amount + " items left";
}

function initInput() {
    input.addEventListener("keypress", e => {
        if (e.code === "Enter" && input === document.activeElement) {
            let inputValue = input.value;
            if (inputValue.length > 0) {
                addElement(inputValue);
                input.value = "";
            } else {
                alert("Write anything")
            }
        }
    })
}

function initDelBtns() {
    for (let i = 0; i < elements.length; i++) {
        const delButton = elements[i].getElementsByClassName("todo-element_delete")[0];
        initDelBtn(elements[i], delButton);
    }
}

function initDelBtn(element, delButton) {
    delButton.addEventListener("click", () => {
        element.parentNode.removeChild(element);
        updateElements();
    })
}

function initClearBtn() {
    document.getElementsByClassName("clear-completed-btn")[0].addEventListener("click", () => {
        clearCompleted();
    })
}

function initAddBtn() {
    document.getElementsByClassName("todo-creator_button")[0].addEventListener("click", () => {
        selectAll();
    })
}

function initCategories() {
    if (document.getElementById("all").checked)
        getCategoryElements("all");
    else if (document.getElementById("active").checked)
        getCategoryElements("active");
    else
        getCategoryElements("completed");
    document.getElementById("all").addEventListener("click", () => {
        getCategoryElements("all");
    })
    document.getElementById("active").addEventListener("click", () => {
        getCategoryElements("active");
    })
    document.getElementById("completed").addEventListener("click", () => {
        getCategoryElements("completed");
    })
}

function changeCategory(category) {
    document.getElementById(category).checked = true;
    getCategoryElements(category);
}

function getCategoryElements(category) {
    if (category === "all") {
        for (let i = 0; i < elements.length; i++) {
            elements[i].hidden = false;
        }
    } else if (category === "active") {
        for (let i = 0; i < elements.length; i++) {
            elements[i].hidden = elements[i].getElementsByClassName("todo-element_checkbox")[0].checked;
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].hidden = !elements[i].getElementsByClassName("todo-element_checkbox")[0].checked;
        }
    }
    updateCounter();
}

function selectAll() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].getElementsByClassName("todo-element_checkbox")[0].checked = true;
    }
}

function addElement(name) {
    console.log(`Added : ${name}`);
    const parentElement = document.getElementsByClassName("todo-list")[0];
    const newElement = document.createElement("li");
    newElement.className = "todo-element_wrapper";
    newElement.innerHTML =
        "                <label class=\"todo-list_element\">\n" +
        "                    <input type=\"checkbox\" class=\"todo-element_checkbox\" aria-label=\"Set as done\">\n" +
        "                    <span class=\"todo-element_check_box\"></span>\n" +
        `                   <span class=\"todo-element_name\">${name}</span>\n` +
        "                    <button class=\"todo-element_delete\" aria-label=\"Delete todo\"></button>\n" +
        "                </label>\n";
    changeCategory("all");
    parentElement.appendChild(newElement);
    initDelBtn(newElement, newElement.getElementsByClassName("todo-element_delete")[0]);
    updateElements();
}

function clearCompleted() {
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].getElementsByClassName("todo-element_checkbox")[0].checked) {
            elements[i].parentElement.removeChild(elements[i]);
        }
    }
    updateElements();
}

// Drag system
const todoListParent = document.querySelector(".todo-list");
const wrapperElements = todoListParent.querySelectorAll(".todo-element_wrapper");
console.log(wrapperElements);
for (const element of wrapperElements) {
    element.draggable = true;
}
todoListParent.addEventListener("dragstart", (e) => {
    e.target.classList.add("selected");
})
todoListParent.addEventListener("dragend", (e) => {
    e.target.classList.remove("selected");
})

todoListParent.addEventListener("dragover", (e) => {
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
    todoListParent.insertBefore(currentSelected, nextElement.parentNode);
})

const getNextElement = (cursorPos, currentElement) => {
    const currentElementPos = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementPos.y + currentElementPos.height / 2;
    return (cursorPos < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
}