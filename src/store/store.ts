import { configureStore } from "@reduxjs/toolkit";
import nav from "./slices/navSlice";

export const makeStore = () => 
    configureStore({
        reducer: {nav},
        devTools: process.env.NODE_ENV !== "production",
    });


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];