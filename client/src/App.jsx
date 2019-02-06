import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Api, JsonRpc, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('http://127.0.0.1:7777');
const api = new Api({ rpc, signatureProvider });

class App extends Component {

  state = {
    account: '',
    name: '',
    mail: '',
    about: '',
    count: 0,
  };

  async componentDidMount() {
    try {
      const resp = await rpc.get_table_rows({
        json: true,
        code: 'accountbook',
        scope: 'accountbook',
        table: 'people',
        lower_bound: 'alice',
        limit: 1,
      });
      console.log(resp);
      if (!resp.rows || resp.rows[0].length === 0) throw Error('get no rows');
      const result = resp.rows[0];
      this.setState({
        account: result.key,
        name: result.name,
        mail: result.mail,
        about: result.about,
      });
    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
  }

  addCount(count) {
    console.log(`click!! ${count}`);
    this.setState({ count: count + 1 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>id: {this.state.account}</p>
          <p>名前: {this.state.name}</p>
          <p>{this.state.mail}</p>
          <p>{this.state.about}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => this.addCount(this.state.count)}>{this.state.count}</button>
        </header>
      </div>
    );
  }
}

export default App;
