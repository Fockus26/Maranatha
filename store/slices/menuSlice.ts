import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
    isOpen: boolean;
}

const initialState: MenuState = {
    isOpen: false,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isOpen = true;
        },

        closeMenu: (state) => {
            state.isOpen = false;
        },

        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
