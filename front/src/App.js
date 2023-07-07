import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { APIBase } from './tools/api';

function App() {
  const [example, setExample] = useState(false);

  const asyncExample = async () => {
    console.log(APIBase + '/example');
    const response = await axios.post(APIBase + '/example');
    if (response.status === 200) {
      setExample(response.data.example);
    }
  };

  asyncExample();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Connection Status : {(example === true) ? '성공' : '실패'}</p>
      </header>
    </div>
  );
}

export default App;
