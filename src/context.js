import React from 'react';

const TodosContext = React.createContext({
  todos: [
    // { id: 1, text: "Eat breakfast", complete: false },  // replacing hard-coded todos with what's fetched from the api endpoint 
    // { id: 2, text: "Do laundry", complete: false },
    // { id: 3, text: "Finish project", complete: true }
  ],
  currentTodo: {}
})

export default TodosContext;