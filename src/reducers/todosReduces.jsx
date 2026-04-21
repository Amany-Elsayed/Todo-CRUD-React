import { v4 as uuidv4 } from "uuid";

export default function todoReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        desc: "",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id != action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "edited": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            desc: action.payload.desc,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "checked": {
    const updatedTodos = currentTodos.map((t) => {
      if (t.id == action.payload.id) {
        return {...t, isCompleted: !t.isCompleted}
      }
      return t;
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos
    }

    case "getTodos": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos
    }

    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
