import Header from "./Components/Header/Header";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Main from "./Main";
import { Provider, useSelector } from "react-redux";
import store from "./store/mainSlice";
import DummyNav from "./Components/Nav/DummyNav";
import DummyHeader from "./Components/Header/DummyHeader";
import Spinner from "./Components/UI/Loading/Spinner";
import LoginPage from "./Components/Authentication/LoginPage";
import { Redirect, Route } from "react-router";

const App = () => {
  const idToken = useSelector((state) => state.user.authentication.idToken);
  const uid = useSelector((state) => state.user.authentication.uid);
  console.log(uid, idToken);

  return (
    <>
      {!idToken && (
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      )}
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
    </>
  );
};

export default App;
