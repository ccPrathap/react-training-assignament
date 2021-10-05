import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from './GlobalContext';

export default function About() {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const vaccineType = context.vaccineType;
  const handleClick = () => history.push("/");

  return <>
    <h2>About Page...</h2>
    <div>Default vaccine type: <b>{vaccineType}</b></div>
    <button onClick={handleClick}>Go back Home</button>
  </>;
}