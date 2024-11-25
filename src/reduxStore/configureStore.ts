import {configureStore} from '@reduxjs/toolkit';
import {ridesReducer} from '../reducers';

const store = configureStore({
  reducer: {
    rides: ridesReducer, // Use the reducer from createSlice
  },
});

export default store;
