import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
// import TodoList from "./features/todos/TodoList";
// import AddTodo from "./features/todos/AddTodo";

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList /> 
      {/* <h1>Task List</h1>
      <AddTodo />
      <TodoList /> */}
    </main>
  );
}

export default App;