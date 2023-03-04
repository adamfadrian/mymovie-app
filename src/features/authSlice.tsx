import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    username?: string | any,
    password?: string
}

export interface AuthState {
    isAuth: boolean,
    user: User | null
}

const initialState : AuthState = {
    isAuth: false,
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, actions: PayloadAction<User>){
            state.isAuth = true,
            state.user = actions.payload
        },
        logout(state){
            state.isAuth = false,
            state.user = null
        }
    }

    
})

export const {login, logout} = authSlice.actions