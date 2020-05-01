import React, { useContext, useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
}

const App = () => {
  const initialState = useContext(TodosContext);    // initialize the state
  const [state, dispatch] = useReducer(todosReducer, initialState); // and pass it as an argument to useReducer() together with a reducer 

  // A custom hook: 
  const savedTodos = useAPI("https://hooks-api.igoreskin.now.sh/todos");  // the useAPI() function has been declared up on the top 

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    })}, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
