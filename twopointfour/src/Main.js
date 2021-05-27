import Timer from "./Components/Timer/Timer";
import { Route, Redirect, useHistory } from "react-router-dom";
import Run from "./Components/Run/Run";
import Logs from "./Components/Logs/Logs";
import Questionnaire from "./Components/Questionnaire/Questionnaire";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialiseData } from "./store/mainSlice";
import LoadingPage from "./Components/UI/Loading/LoadingPage";
import LoadingModal from "./Components/UI/Loading/LoadingModal";
import Profile from "./Components/Profile/Profile";
import Analytics from "./Components/Analytics/Analytics";
import RadioTabs from "./Components/UI/Input/RadioTabs";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initialiseData());
  }, []);

  const status = useSelector((state) => state.ui.main.status);
  const modalVisible = useSelector((state) => state.ui.modal.show);

  return (
    <>
      {status === "success" && (
        <>
          {modalVisible && <LoadingModal />}
          <Route path="/" exact>
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/timer">
            <Timer></Timer>
          </Route>
          <Route path="/run">
            <Run></Run>
          </Route>
          <Route path="/logs">
            <RadioTabs />
            <Logs></Logs>
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/questionnaire">
            <Questionnaire></Questionnaire>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </>
      )}
      {status === "loading" && <LoadingPage></LoadingPage>}
    </>
  );
};

export default Main;
