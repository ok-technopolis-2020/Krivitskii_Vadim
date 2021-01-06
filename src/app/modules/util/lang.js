import {TodoWrapper} from "../todo/todo-wrapper";

export class LangUtil {


    static getItemsLeftMsg(itemsAmount) {
        if (TodoWrapper.itemsLeft === 1) {
            return `${TodoWrapper.itemsLeft} item left`;
        } else {
            return `${TodoWrapper.itemsLeft} items left`;
        }
    }


}