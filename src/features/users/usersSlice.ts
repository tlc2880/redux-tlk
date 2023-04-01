import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'John Doe' },
    { id: '1', name: 'Mary Smith' },
    { id: '2', name: 'Tommy Cao' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state: any) => state.users;
export default usersSlice.reducer