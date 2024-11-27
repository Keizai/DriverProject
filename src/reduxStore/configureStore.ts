import {configureStore} from '@reduxjs/toolkit';
import {ridesReducer} from '../reducers';
import reactotron from '../../ReactotronConfig';

const store = configureStore({
  reducer: {
    rides: ridesReducer, // Use the reducer from createSlice
  },
  enhancers: defaultEnhancers =>
    __DEV__
      ? defaultEnhancers().concat(reactotron.createEnhancer!())
      : defaultEnhancers(),
});

export default store;
