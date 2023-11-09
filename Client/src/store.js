import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"

//created new store
export const store = configureStore({
    reducer : {
        auth : authSlice,
    },
})