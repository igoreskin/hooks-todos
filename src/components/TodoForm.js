import React, { useState, useContext } from 'react';
import TodosContext from '../context';

const TodoForm = () => {

  const [todo, setTodo] = useState("");

  const { /*state, */dispatch } = useContext(TodosContext); // destructured from value = {{ state, dispatch }} of TodosContext.Provider

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "ADD_TODO", payload: todo });
    setTodo("");
  }

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input type="text" className="border-black border-solid border-2" onChange={event => setTodo(event.target.value)} value={todo} />
    </form>
  )
}

export default TodoForm;
