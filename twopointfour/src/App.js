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
import { postHTTP, postHTTPNoAuth } from "./Components/Helper/Complementary";
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
    async function autoLogin() {
      const refreshToken = document.cookie
        .split("; ")
        .find((ele) => ele.startsWith("refreshToken"))
        ?.split("=")[1];

      const idTokenBody = {
        refresh: refreshToken,
      };

      console.log(refreshToken.slice(-10));
      async function getIDToken() {
        const response = await postHTTPNoAuth(`${API_ROOT_ENDPOINT}/token/refresh`, idTokenBody);
        return response["access"];
      }

      const idToken = await getIDToken();

      console.log(idToken.slice(-5));
      //   document.cookie = `refreshToken=${getRefreshToken()}; max-age=31536000`;

      async function getUserPK() {
        const request = await fetch(`${API_ROOT_ENDPOINT}/user/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        const data = await request.json();
        return data["id"];
      }

      const uid = await getUserPK();

      if (refreshToken) {
        dispatch(userAction.updateRefreshToken(refreshToken));
      }
      if (refreshToken && idToken && uid) {
        dispatch(
          userAction.updateAuthentication({
            idToken,
            refreshToken,
            uid,
            pid: "",
          })
        );
        history.replace("/run");
      }
    }
    autoLogin();
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
          {profileModalVisible && <ProfileModal />}
          <Main></Main>
          {!timerOn && (
            <>
              <DummyNav />
              <Nav />
            </>
          )}
        </>
      )}
      {/* {refreshToken && !idToken && (
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      )} */}
      {!idToken && (
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      )}
    </>
  );
};

export default App;
