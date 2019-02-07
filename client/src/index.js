import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Account from './contexts/Account';
import Post from './contexts/Post';
import Action from './contexts/Action';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Account.Provider>
    <Post.Provider>
      <Action.Provider>
        <App/>
      </Action.Provider>
    </Post.Provider>
  </Account.Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
