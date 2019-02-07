
import * as React from 'react';
import { Api, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import rpc from '../shared/rpc';

const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const api = new Api({ rpc, signatureProvider });
const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.tweet = async (text) => {
      if(text.length < 140) {
        try {
          const result = await api.transact({
            actions: [{
              account: 'twitter',
              name: 'tweet',
              authorization: [{
                  actor: 'alice',
                  permission: 'active',
              }],
              data: {
                  user: 'alice',
                  text: text,
                  tweeted_at: (new Date()).getTime(),
              },
          }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
          console.log(result);
          const { processed } = result;
          this.setState({
            ...this.state,
            status: processed.receipt.status,
          });
        } catch (e) {
          console.log('\nCaught exception: ' + e);
          if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
        }
      } else {
        this.setState({
          ...this.state,
          status: 'long',
        });
      }
    };

    this.changeStatus = (newStatus) => {
      this.setState({
        ...this.state,
        status: newStatus,
      });
    }

    this.state = {
      tweet: this.tweet,
      status: '',
      changeStatus: this.changeStatus,
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