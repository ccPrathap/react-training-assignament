import './App.css';
import Home from './Home';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Home age={"18+"} org={props.org} />
      </header>
    </div>
  );
}

export default App;
