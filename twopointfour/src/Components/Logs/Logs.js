import { useSelector } from "react-redux";
import { Route } from "react-router";
import CardNotFound from "../UI/Card/CardNotFound";
import RadioLinks from "../UI/Input/RadioLinks";
import RadioTabs from "../UI/Input/RadioTabs";
import LogItem from "./LogItem";
import styles from "./Logs.module.css";
import LogsCommunity from "./LogsCommunity";
import LogsPersonal from "./LogsPersonal";

const Logs = () => {
  return (
    <>
      <RadioLinks />
      <Route path="/logs/mylogs">
        <LogsPersonal />
      </Route>
      <Route path="/logs/community">
        <LogsCommunity />
      </Route>
    </>
  );
};

export default Logs;
