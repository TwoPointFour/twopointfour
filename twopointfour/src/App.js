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
import { postHTTP } from "./Components/Helper/Complementary";

const App = () => {
  const idToken = useSelector((state) => state.user.authentication.idToken);
  const uid = useSelector((state) => state.user.authentication.uid);
  const location = useLocation();
  const pathArray = location.pathname.split("/").slice(1);
  const timerOn = pathArray.some((ele) => ele === "timer");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function autoLogin() {
      const uid = document.cookie
        .split("; ")
        .find((ele) => ele.startsWith("uid"))
        ?.split("=")[1];
      // const idToken = document.cookie
      //   .split("; ")
      //   .find((ele) => ele.startsWith("idToken"))
      //   ?.split("=")[1];
      const refreshToken = document.cookie
        .split("; ")
        .find((ele) => ele.startsWith("refreshToken"))
        ?.split("=")[1];

      //   const refreshTokenBody = {
      //     token: idToken,
      //     returnSecureToken: true,
      //   }

      //   async function getRefreshToken() {
      //     return await postHTTP(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAMxK4FTyqlPHYVPkzFE6i7yI_mHqCvKJg
      //     `, refreshTokenBody)
      //   }

      const idTokenBody = {
        grant_type: "refresh_token",
        refreshToken: refreshToken,
      };

      async function getIDToken() {
        const response = await postHTTP(
          `https://securetoken.googleapis.com/v1/token?key=AIzaSyAMxK4FTyqlPHYVPkzFE6i7yI_mHqCvKJg`,
          idTokenBody
        );
        return response["id_token"];
      }

      const idToken = await getIDToken();

      //   document.cookie = `refreshToken=${getRefreshToken()}; max-age=31536000`;

      // console.log(uid, idToken);

      if (refreshToken) {
        dispatch(userAction.updateRefreshToken(refreshToken));
      }
      if (uid && idToken) {
        dispatch(
          userAction.updateAuthentication({
            idToken,
            uid,
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
