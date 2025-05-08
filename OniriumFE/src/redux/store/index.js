import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../slices/dataSlice";
import selectionReducer from "../slices/selectionSlice";
import userReducer from "../slices/userSlice";
import characterDetailsReducer from "../slices/characterDetailsSlice";



export const store = configureStore({
  reducer: {
    data: dataReducer,
    selection: selectionReducer,
    user: userReducer,  
    characterDetails: characterDetailsReducer,  
  },
});
