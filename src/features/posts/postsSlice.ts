import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";
import postType from '../../post.Type';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

type IPost = {
    posts: [
        {
            id: string,
            title: string,
            content: string,
            userId: string,
            date: string,
            body: string,
            reactions: {}
        }
    ],
    status: string
    error: string | null | undefined
}

const initialState: IPost = {
    posts: [
        {
            id: '',
            title: '',
            content: '',
            userId: '',
            date: '',
            body: '',
            reactions: {}
        }
    ],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost: any = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost: any = createAsyncThunk('posts/updatePost', async (post: postType) => {
    const { id } = post;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, post)
        return response.data
    } catch (err) {
        //return err.message;
        return post; // only for testing Redux!
    }
})

export const deletePost: any = createAsyncThunk('posts/deletePost', async (post: postType) => {
    const { id } = post;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return post;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<postType>) {
                state.posts.push(action.payload)
            },
            prepare(title, content, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        body,
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
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state: any, action: PayloadAction<postType>) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post: postType )=> post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state: any, action: PayloadAction<postType>) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter((post: postType ) => post.id !== id);
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;
export const selectPostById = (state: any, postId: number) =>
    state.posts.posts.find((post: any) => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions
export default postsSlice.reducer