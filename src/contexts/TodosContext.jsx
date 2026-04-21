import { createContext, useReducer, useContext } from "react";
import todoReducer from "../reducers/todosReduces";

const TodosContext = createContext([]);

export function TodosProvider({ children }) {
  const [todos, todosDispatch] = useReducer(todoReducer, []);

  return (
    <TodosContext.Provider value={{ todos: todos, dispatch: todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
    return useContext(TodosContext)
}
