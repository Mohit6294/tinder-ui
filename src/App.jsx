import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import appStore from "./utils/appStore";
import { Provider } from 'react-redux';
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore} >
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element= {<Feed />} ></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
