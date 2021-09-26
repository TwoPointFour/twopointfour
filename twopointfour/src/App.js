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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { autoLogin } from "./Components/Helper/Complementary";
import { API_ROOT_ENDPOINT } from "./Configurations/Config";
import ProfileModal from "./Components/Profile/ProfileModal";

const App = () => {
  const { idToken, refreshToken } = useSelector((state) => state.user.authentication);
  const state = useSelector((state) => state);
  const location = useLocation();
  const pathArray = location.pathname.split("/").slice(1);
  const timerOn = pathArray.some((ele) => ele === "timer");
  const dispatch = useDispatch();
  const history = useHistory();
  const profileModalVisible = useSelector((state) => state.ui.profile.show);

  useEffect(() => {
    autoLogin(API_ROOT_ENDPOINT, history, dispatch);
    console.log(idToken, refreshToken, state);
  }, []);

  const header = !timerOn && (
    <>
      <Header></Header>
      <DummyHeader />
    </>
  );

  const footer = !timerOn && (
    <>
      <DummyNav />
      <Nav />
    </>
  );

  const main = idToken ? (
    <>
      {header}
      <Main></Main>
      {footer}
    </>
  ) : (
    <Route path="*">
      <Redirect to="/login"></Redirect>
    </Route>
  );

  return (
    <>
      <Route path="/login">
        <LoginPage></LoginPage>
      </Route>
      {main}
    </>
  );
};

export default App;
