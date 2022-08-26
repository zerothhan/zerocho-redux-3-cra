const { createStore, compose, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");

const reducer = require("./reducers");
const { addPost } = require("./actions/post");
const { logIn, logOut } = require("./actions/user");

const initialState = {
  user: {
    isLoggingIn: false,
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

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);

module.exports = store;
