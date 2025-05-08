import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const store =configureStore({
    reducer:{
        auth: authSlice,
        // auth: (state = { status: false, userData: null }, action) => {
        //     switch (action.type) {
        //         case 'auth/login':
        //             return { ...state, status: true, userData: action.payload.userData };
        //         case 'auth/logout':
        //             return { ...state, status: false, userData: null };
        //         default:
        //             return state;
        //     }
        // },
    }
})


export default store;