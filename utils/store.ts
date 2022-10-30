import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './products.slice';
import userReducer from './user.slice';

const store =  configureStore({
  reducer: {
    products:productsReducer,
    userDetails:userReducer
  },
})
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch