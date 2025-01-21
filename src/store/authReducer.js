import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  token: null,
  expiration: null,
  userId: "678ddadd907b8024a57fbd46",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      /* const token = action.payload;
            const decoded = jwtDecode(token); // Decodificar el token para obtener `exp`
            const expiration = decoded.exp * 1000; // Convertir de segundos a milisegundos

            state.token = token;
            state.expiration = expiration; 
            const userId = decodedToken.userId;
            */
      console.log("Payload: " + action.payload);
      state.isAuthenticated = action.payload;

      /* localStorage.setItem("authToken", token); */
    },
    logout: (state) => {
      state.token = null;
      state.expiration = null;
      state.isAuthenticated = false;
      state.userId = null;
      /* localStorage.removeItem("authToken"); */
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
