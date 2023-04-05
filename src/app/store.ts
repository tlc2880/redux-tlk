import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
export type AppDispatch = typeof store.dispatch;


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    }
})


// Define the `RootState` as the return type:
export type RootState = ReturnType<typeof store.getState>;