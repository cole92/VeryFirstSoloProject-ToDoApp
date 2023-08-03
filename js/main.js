const todoForm = document.querySelector('.todo-form');            
const todoInput = document.querySelector('.todo-input');        /* Accessing elements */   
const todoItemsList = document.querySelector('.todo-items'); 
console.log(todoForm,todoInput,todoItemsList);

let todos = [];  // Creating an empty array.

todoForm.addEventListener('submit', function(event){    /* Adding event listener */   /* */
    event.preventDefault();
    addTodo(todoInput.value);
});
const addTodo = item => {
    if (item.trim() !== '') {          /* Creating the addTodo function, which I previously called in the event listener, used for adding notes to an empty array. */
        const todo = {                 /* Checking if the input field is empty; if it's not, creating a new object with 3 keys, and then adding it to an empty array using the push method. */                
            id: Date.now(),            /* Using the addToLocalStorage method to add it to local storage. After that, I clear everything from the input field. */
            name: item,
            completed: false
        } 
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = ''
    } else {
        alert ('Please enter some data!')
    }
}
