const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers");
const { addPost } = require("./actions/post");
const { logIn, logOut } = require("./actions/user");

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

// compose : 합성하는 함수
// compose 없이도 동작함
// compose를 하는 이유 : applyMiddleware 말고 redux devtool 같은 것들도 추가적으로 붙일 때 compose로 함수를 합성한다.
const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  // 비동기
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action); // 동기
};

const enhancer = compose(
  applyMiddleware(firstMiddleware, thunkMiddleware),
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

const store = createStore(reducer, initialState, enhancer);

module.exports = store;
