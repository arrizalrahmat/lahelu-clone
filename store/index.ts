import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import memesReducer from './reducers/memes';

const store = configureStore({
  reducer: combineReducers({
    memes: memesReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
