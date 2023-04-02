import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
//import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
// import TodoList from "./features/todos/TodoList";
// import AddTodo from "./features/todos/AddTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
        </Route>
      </Route>
    </Routes>
    /* <h1>Task List</h1>
      <AddTodo />
      <TodoList /> */
  );
}

export default App;