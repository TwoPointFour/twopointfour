import Header from "./Components/Header/Header";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./store/mainSlice";
import DummyNav from "./Components/Nav/DummyNav";
import DummyHeader from "./Components/Header/DummyHeader";
import Spinner from "./Components/UI/Loading/Spinner";

const App = () => {
  return (
    <Provider store={store}>
      <Header></Header>
      <DummyHeader />
      <Main></Main>
      <Nav />
      <DummyNav />
    </Provider>
  );
};

export default App;
