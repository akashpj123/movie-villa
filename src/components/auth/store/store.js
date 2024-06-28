import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import authAdminReducer from './authAdminSlice'; // Corrected import name for better clarity

// Configure the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Auth reducer
        authAdmin: authAdminReducer // Admin auth reducer, using a clearer key name
    }
});

export default store;
