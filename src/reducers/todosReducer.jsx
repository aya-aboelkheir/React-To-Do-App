import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newtodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newtodo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id != action.payload.id,
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      if (action.payload.title.trim() === "") {
        return currentTodos;
      }
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
      return storageTodos;
    }

    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("unknown Action" + action.type);
    }
  }
}
