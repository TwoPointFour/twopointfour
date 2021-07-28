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
import { useLocation } from "react-router-dom";
import { autoLogin } from "./Components/Helper/Complementary";
import { API_ROOT_ENDPOINT } from "./Configurations/Config";
import ProfileModal from "./Components/Profile/ProfileModal";

const App = () => {
  const idToken = useSelector((state) => state.user.authentication.idToken);
  const refreshToken = useSelector((state) => state.user.authentication.refreshToken);
  const location = useLocation();
  const pathArray = location.pathname.split("/").slice(1);
  const timerOn = pathArray.some((ele) => ele === "timer");
  const dispatch = useDispatch();
  const history = useHistory();
  const profileModalVisible = useSelector((state) => state.ui.profile.show);

  useEffect(() => {
    autoLogin(API_ROOT_ENDPOINT, history);
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
          {!timerOn && (
            <>
              <Header></Header>
              <DummyHeader />
            </>
          )}
          <Main></Main>
          {!timerOn && (
            <>
              <DummyNav />
              <Nav />
            </>
          )}
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
