class TodoWrapper {


    todoElements = [];

    addElement(element) {
        this.todoElements.push(element);
    }
}
const todoWrapper = new TodoWrapper();
export default todoWrapper;