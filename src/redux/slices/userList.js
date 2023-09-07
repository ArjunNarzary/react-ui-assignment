import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userListSlice = createSlice({
    name: "USERLIST",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return [action.payload, ...state]
        },
        editUser: (state, action) => {
            return state.map(user => {
                if(user.id === action.payload.id){
                    return { ...user, ...action.payload }
                }
                return user
            })
        },
        deleteUser : (state, action) => {
            const index = state.findIndex(user => user.id === action.payload.id);
            if(index > -1){
                if(state.length > 0){
                    let newState = [...state];
                    newState.splice(index, 1);
                    return newState;
                }else{
                    return initialState
                }
            }else{
                return state;
            }
        },
        deleteAllUserWithRole : (state, action) => {
            return state.filter(user => user.role !== action.payload.roleKey);
        }
    },
});

export const { addUser, editUser, deleteUser, deleteAllUserWithRole } = userListSlice.actions;

export default userListSlice.reducer;
