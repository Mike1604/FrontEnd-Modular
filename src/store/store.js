import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./authReducer";
import themeReducer from "./themeReducer"

const store = configureStore({
    reducer: {
        auth: loginReducer, 
        theme: themeReducer
    }
})

export default store;