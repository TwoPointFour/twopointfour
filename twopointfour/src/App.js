import Header from "./Components/Header/Header";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Main from "./Main";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { userAction } from "./store/mainSlice";
import DummyNav from "./Components/Nav/DummyNav";
import DummyHeader from "./Components/Header/DummyHeader";
import Spinner from "./Components/UI/Loading/Spinner";
import LoginPage from "./Components/Authentication/LoginPage";
import { Redirect, Route, useHistory } from "react-router";
import Authorized from "./Components/Authentication/Authorized";
import { useEffect } from "react";

const App = () => {
  const idToken = useSelector((state) => state.user.authentication.idToken);
  const uid = useSelector((state) => state.user.authentication.uid);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const uid = document.cookie
      .split("; ")
      .find((ele) => ele.startsWith("uid"))
      ?.split("=")[1];
    const idToken = document.cookie
      .split("; ")
      .find((ele) => ele.startsWith("idToken"))
      ?.split("=")[1];

    console.log(uid, idToken);

    if (uid && idToken) {
      dispatch(
        userAction.updateAuthentication({
          idToken,
          uid,
        })
      );
      history.replace("/run");
    }
  }, []);

  return (
    <>
      <Route path="/authorized">
        <Authorized />
      </Route>
      <Route path="/login">
        <LoginPage></LoginPage>
      </Route>
      {idToken && (
        <>
          <Header></Header>
          <DummyHeader />
          <Main></Main>
          <Nav />
          <DummyNav />
        </>
      )}
      {!idToken && (
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      )}
    </>
  );
};

export default App;
