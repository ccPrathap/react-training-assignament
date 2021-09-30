import './App.css';
import HomeHook from './HomeHook';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <HomeHook age={"18+"} org={props.org} />
      </header>
    </div>
  );
}

export default App;
