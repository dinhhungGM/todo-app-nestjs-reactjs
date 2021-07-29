import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import manageTodoReducer from '../features/me/ManageTodoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    manageTodo: manageTodoReducer
  },
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
