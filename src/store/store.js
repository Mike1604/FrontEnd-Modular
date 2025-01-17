import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import themeReducer from "./themeSlice"

const store = configureStore({
    reducer: loginReducer
})

export default store;