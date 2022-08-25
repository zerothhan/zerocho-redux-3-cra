import logo from "./logo.svg";
import "./App.css";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./redux/actions/user";

function App() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "zerocho",
        password: "1234",
      })
    );
  }, []);

  return (
    <div>
      {user ? <div>{user.nickname}</div> : "로그인 해주세요."}
      <button onClick={onClick}>로그인</button>
    </div>
  );
}

export default App;
