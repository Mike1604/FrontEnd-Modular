import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  token: null,
  expiration: null,
  userId: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      const decoded = jwtDecode(token);
      
      const expiration = decoded.exp * 1000; 

      state.token = token;
      state.expiration = expiration;
      state.userId = decoded.sub;
      state.isAuthenticated = true;
      state.isLoading = false; 

      localStorage.setItem("authToken", token);
    },
    logout: (state) => {
      state.token = null;
      state.expiration = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.isLoading = false;
      localStorage.removeItem("authToken");
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const expiration = decoded.exp * 1000;
          const currentTime = Date.now();

          if (expiration > currentTime) {
            state.token = token;
            state.expiration = expiration;
            state.userId = decoded.sub;
            state.isAuthenticated = true;
          } else {
            localStorage.removeItem("authToken"); 
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("authToken");
        }
      }
      state.isLoading = false; 
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
