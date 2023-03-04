import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { json } from "react-router-dom"

export interface Item {
    title: any
    poster_path: string
    id: number | any,
    overview: string
    release_date: string
}

export interface FavoriteState {
    items: Item[]
}

const initialState: FavoriteState = {
    items: []
}

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addItemToFav(state, action: PayloadAction<Item>) {
            state.items.push(action.payload)
            localStorage.setItem('addtoFav', JSON.stringify(state.items))
            console.log(action.payload);
        },
        removeItemFromFav(state, action: PayloadAction<number|any>) {
            state.items = state.items.filter((item) => {
              return item.id !== action.payload
            })
          }
    }
})

export const { addItemToFav, removeItemFromFav } = favoriteSlice.actions