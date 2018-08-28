import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

// Discuss Promise Middle Ware....... Do we need any reducers

import postReducer from "./ducks/postReducer";

const combinedReducers = combineReducers({
  post: postReducer
});

const middlewares = applyMiddleware(promiseMiddleware());
const store = createStore(combinedReducers, middlewares);

export default store;
