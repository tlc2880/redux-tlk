import { useState, FormEvent  } from "react";
import { useDispatch } from "react-redux";
// Import the action from slice:
import { addTodo } from "./todosSlice";

// The rest of the code stays the same:
export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");

    dispatch(
      addTodo({
        id: Date.now().toString(),
        completed: false,
        title,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="todoName"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add Todo</button>
    </form>
  );
};
export default AddTodo;