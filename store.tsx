import { configureStore } from "@reduxjs/toolkit"
import { favoriteSlice } from "./src/features/favoriteSlice"
import { authSlice } from "./src/features/authSlice"

export default configureStore({ 
reducer: {
    favorite: favoriteSlice.reducer,
    auth: authSlice.reducer,
}
})
