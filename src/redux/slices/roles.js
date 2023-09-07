import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const rolesSlice = createSlice({
    name: "ROLES",
    initialState,
    reducers: {
        addRole: (state, action) => {
            return [action.payload, ...state];
        },
        editRole: (state, action) => {
           return state.map(role => {
                if (role.id === action.payload.id) {
                    return { ...role, ...action.payload }
                }
                return role
            })
        },
        deleteRole: (state, action) => {
            const index = state.findIndex(role => role.id === action.payload.id);
            if (index > -1) {
                if(state.length > 1){
                    let newState = [...state]
                    newState.splice(index, 1);
                    return newState;
                }else{
                    return initialState;
                }
            }else{
                return state;
            }
        }
    },
});

export const { addRole, editRole, deleteRole } = rolesSlice.actions;

export default rolesSlice.reducer;
