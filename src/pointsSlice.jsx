import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'points',
    initialState: {
        value: [],
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
        add: (state, action) => {
            state.value.push(action.payload);
        }
    },
})
export const { set, add } = counterSlice.actions
export default counterSlice.reducer