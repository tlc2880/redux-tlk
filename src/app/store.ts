import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
// import usersReducer from '../features/users/usersSlice';
//import todosSlice from "../features/todos/todosSlice";


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        // users: usersReducer,
        //todos: todosSlice
    }
})


// Define the `RootState` as the return type:
export type RootState = ReturnType<typeof store.getState>;