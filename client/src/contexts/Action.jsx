
import * as React from 'react';
import { Api, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import rpc from '../shared/rpc';

const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const api = new Api({ rpc, signatureProvider });
const Context = React.createContext();

const tweet = (text) => console.log(text);
class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet,
    }
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default {
  Consumer: Context.Consumer,
  Provider,
  Context,
};