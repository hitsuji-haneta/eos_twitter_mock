import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Account from './contexts/Account';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Account.Provider>
    <App />
  </Account.Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
