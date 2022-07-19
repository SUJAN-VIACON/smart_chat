import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";


interface AuthState {
    auth: object
}

const initialState: AuthState = {
    auth: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStore(state: AuthState, action: PayloadAction<object>) {
            state.auth = action.payload;
        }
    }
})

export const { authStore } = authSlice.actions;
export default authSlice.reducer;