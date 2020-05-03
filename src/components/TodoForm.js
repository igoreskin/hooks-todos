import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import TodosContext from '../context';

const TodoForm = () => {

  const [todo, setTodo] = useState("");
  const { state, dispatch } = useContext(TodosContext); // destructured from value = {{ state, dispatch }} of TodosContext.Provider

  useEffect(() => {
    if (state.currentTodo.text) {
      setTodo(state.currentTodo.text);
    } else {
      setTodo(""); // to clear the input field in case if the todo has just been deleted
    }
  }, [state.currentTodo.id])

  const handleSubmit = async event => {
    event.preventDefault();
    if (state.currentTodo.text && !!todo && state.todos.findIndex(t => t.text === todo) < 0) {
      const response = await axios.patch(`https://hooks-api.igoreskin.now.sh/todos/${state.currentTodo.id}`, {
        text: todo
      })
      dispatch({ type: "UPDATE_TODO", payload: response.data});
    } else if (!!todo && state.todos.findIndex(t => t.text === todo) < 0) {
      const response = await axios.post("https://hooks-api.igoreskin.now.sh/todos", {
        id: uuidv4(),
        text: todo,
        complete: false
      })
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  }

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input type="text" className="border-black border-solid border-2" onChange={event => setTodo(event.target.value)} value={todo} />
    </form>
  )
}

export default TodoForm;
