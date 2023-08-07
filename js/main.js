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
// Function for adding notes to local storage.
const addToLocalStorage = todosArray => {
// Converting the array of notes into JSON format and storing it in local storage under the key 'todos'.
    localStorage.setItem('todos', JSON.stringify(todosArray))
// Calling the function to display notes on the screen to refresh the display after adding a new note.
    renderTodos(todosArray)
}
// Function for loading notes from local storage.
const getFromLocalStorage = () => {
// Retrieving the value under the key 'todos' from local storage.
    const reference = localStorage.getItem('todos');
// Checking if there is a value under that key.
    if (reference) {
// If it exists, we parse the JSON format into an array and assign it to the variable 'todos'.
        todos = JSON.parse(reference);
// Calling the function to display notes on the screen to show the saved notes.
        renderTodos(todos)
    }
};
const renderTodos = todosArray => {
// First, we clear all items in the list to avoid duplicates.
    todoItemsList.innerHTML = '' ;
// Next, we loop through each todo in the todosArray.
    todosArray.forEach(todo => {
// Create a new list item (li) for each todo.
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', todo.id);
// Check if the todo is completed, and add the 'checked' class if it is.
        if (todo.completed) {
            li.classList.add('checked');
        }
// Add the content of the li element, including the checkbox, todo name, and delete button.
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        ${todo.name}
        <button class="delete-button">X</button>
        `;
// Add the li element to the todoItemsList.
        todoItemsList.appendChild(li);
    });
};
// Calling the function 'getFromLocalStorage' upon page load to display the saved notes.
getFromLocalStorage()

// Add event listener to the todo items list to handle checkbox clicks
todoItemsList.addEventListener('click', function(event) {
    // Check if the clicked element has the class 'checkbox'
    if (event.target.classList.contains('checkbox')) {
        // Get the unique identifier (data-key) of the clicked todo item
        const itemKey = event.target.parentElement.getAttribute('data-key');
        // Find the todo item in the array using its id
        const foundTodo = todos.find(todo => todo.id === parseInt(itemKey));
        // If the todo item is found
        if (foundTodo) {
            // Toggle the 'completed' status of the todo item
            foundTodo.completed = !foundTodo.completed;
            // Update the local storage with the modified todos array
            addToLocalStorage(todos);
            // Re-render the todo items on the screen to reflect changes
            renderTodos(todos);
        }
    }
});

todoItemsList.addEventListener('click', function(event){
    // Check if the clicked element has the class 'delete-button'
    if (event.target.classList.contains('delete-button')) {
        // Get the data-key attribute of the parent element
        const itemKey = event.target.parentElement.getAttribute('data-key');
        // Find the index of the task in the 'todos' array
        const foundIndex = todos.findIndex(todo => todo.id === parseInt(itemKey));
        // Check if the task was found
        if (foundIndex !== -1) {
            // Remove the task from the 'todos' array
            todos.splice(foundIndex, 1);
            // Update the local storage
            addToLocalStorage(todos)
            // Refresh the display
            renderTodos(todos)
        }
    }
});

