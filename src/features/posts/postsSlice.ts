import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";
import postType from '../../post.Type';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

type IPost = {
    posts: [{
        id: string,
        title: string,
        content: string,
        userId: string,
        date: string,
        reactions: {}
    }],
    status: string
    error: string | null | undefined
}

const initialState: IPost = {
    posts: [{
        id: '',
        title: '',
        content: '',
        userId: '',
        date: '',
        reactions: {}
    }],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<postType>) {
                state.posts.push(action.payload)
            },
            
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost: any = state.posts.find(post => post.id === postId)
            console.log(existingPost);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<postType[]>) => {
            state.status = 'succeeded'
            // Adding date and reactions
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });

            // Add any fetched posts to the array
            //  @ts-expect-error
            state.posts  = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectAllPosts = (state: any) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer