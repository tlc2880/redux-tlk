import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
//import { sub } from 'date-fns';
import postType from '../../post.Type';

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things."
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza."
    }
];

// type PostsState = {
//     list: postType[];
//   };
  
//   const initialState: PostsState = {
//       list: [
//         {
//             id: '1',
//             title: 'Learning Redux Toolkit',
//             content: "I've heard good things."
//         },
//         {
//             id: '2',
//             title: 'Slices...',
//             content: "The more I say slice, the more I want pizza."
//         }
//       ],
//     };

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
                        userId
                    }
                }
            }
        },
        // reactionAdded(state, action) {
        //     const { postId, reaction } = action.payload
        //     const existingPost = state.find(post => post.id === postId)
        //     if (existingPost) {
        //         existingPost.reactions[reaction]++
        //     }
        // }
    }
})

export const selectAllPosts = (state: any) => state.posts;

export const { postAdded } = postsSlice.actions//, reactionAdded

export default postsSlice.reducer