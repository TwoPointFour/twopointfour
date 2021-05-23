import Timer from "./Components/Timer/Timer";
import { Route, Redirect } from "react-router-dom";
import Run from "./Components/Run/Run";
import Logs from "./Components/Logs/Logs";
import Questionnaire from "./Components/Questionnaire/Questionnaire";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveNextWorkout } from "./store/mainSlice";
import Spinner from "./Components/UI/Loading/Spinner";
import LoadingPage from "./Components/UI/Loading/LoadingPage";
import LoadingModal from "./Components/UI/Loading/LoadingModal";

const Main = () => {
  const dispatch = useDispatch();
  let pages;

  useEffect(() => {
    dispatch(retrieveNextWorkout());
  }, []);

  const status = useSelector((state) => state.ui.main.status);
  const modalVisible = useSelector((state) => state.ui.modal.show);

  return (
    <>
      {status === "success" && (
        <>
          {modalVisible && <LoadingModal />}
          <Route path="/" exact>
            <Redirect to="/run"></Redirect>
          </Route>
          <Route path="/timer">
            <Timer></Timer>
          </Route>
          <Route path="/run">
            <Run></Run>
          </Route>
          <Route path="/logs">
            <Logs></Logs>
          </Route>
          <Route path="/questionnaire">
            <Questionnaire></Questionnaire>
          </Route>
        </>
      )}
      {status === "loading" && <LoadingPage></LoadingPage>}
    </>
  );
};

export default Main;
