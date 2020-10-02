import { Todo } from './components/todo.js';

(function(){
    'use strict';

    const todo = new Todo('#taskInput', '.addBtn', '#todoList', '.saveBtn', '.deleteBtn', '.tasks');
    window.addEventListener('load', todo.init());
   
   
})();
