import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "./slices/userList";
import rolesReducer from "./slices/roles";

const store = configureStore({
    reducer: {
        USERLIST: userListReducer,
        ROLES: rolesReducer,
    }
});

export default store;
