import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux'
import Auth from "./Auth";
import RegistrationModal from "./Auth";
import Main from "./Main";
import store from "./store";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path = "" element={<Auth/>}/>
                  <Route path="/main" element={<Main/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
