import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import postType from '../../post.Type';

const initialState = [
    {
        id: '1',
        title: 'React is cool',
        content: "I've heard good things.",
        userId: '1',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Stay healthy',
        content: "Excercise every day to live longer.",
        userId: '2',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<postType>) {
                state.push(action.payload)
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
            const existingPost: any = state.find(post => post.id === postId)
            console.log(existingPost);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state: any) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions//, reactionAdded
export default postsSlice.reducer