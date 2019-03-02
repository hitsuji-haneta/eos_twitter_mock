import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Account from './contexts/Account';
import Post from './contexts/Post';

ReactDOM.render(
  <Account.Provider>
    <Post.Provider>
      <App/>
    </Post.Provider>
  </Account.Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
