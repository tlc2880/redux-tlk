import { 
    createSlice, 
    PayloadAction, 
    createAsyncThunk, 
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";
import postType from '../../post.Type';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: '',
    count: 0
})

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
    
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if (response?.status === 200) return post;
    return `${response?.status}: ${response?.statusText}`;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {      
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost: any = state.entities[postId]
            console.log('reactionAdded: ', existingPost);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        increaseCount(state) {
            state.count = state.count + 1;
        }
    },
        extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state: any, action: PayloadAction<postType[]>) => {
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
                postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state: any, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state: any, action) => {
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
                postsAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state: any, action: PayloadAction<postType>) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state: any, action: PayloadAction<postType>) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                postsAdapter.removeOne(state, id)
            })
    }
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: any) => state.posts)

export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;
export const getCount = (state: any) => state.posts.count;

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post: postType) => post.userId === userId)
)

export const { increaseCount, reactionAdded } = postsSlice.actions
export default postsSlice.reducer