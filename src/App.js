import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import HomeHook from './HomeHook';
import GlobalContext from './GlobalContext';

function App(props) {
  const [vaccineType, setVaccineType] = useState("COVISHIELD");

  return (
    <div className="App">
      <header className="App-header">
        <GlobalContext.Provider value={{ vaccineType, setVaccineType }}>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/hook">Home Hook</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/hook">
                  <HomeHook age={"18+"} org={props.org} />
                </Route>
                <Route path="/">
                  <Home age={"18 & 45+"} org={props.org} />
                </Route>
              </Switch>
            </div>
          </Router>
        </GlobalContext.Provider>
      </header>
    </div>
  );
}

export default App;
