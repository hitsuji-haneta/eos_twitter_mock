import * as React from 'react';
import { Api, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import rpc from '../shared/rpc';

const defaultPrivateKey = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const api = new Api({ rpc, signatureProvider });
const Context = React.createContext();

const action = async (account, name, id, data) => {
  const result = await api.transact(
    {
      actions: [
        {
          account,
          name,
          authorization: [
            {
              actor: id,
              permission: 'active'
            }
          ],
          data
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );
  return result;
};

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.tweet = async (text, id) => {
      if (text.length < 140) {
        try {
          const data = {
            user: id,
            text: text,
            tweeted_at: new Date().getTime()
          };
          const result = await action('twitter', 'tweet', id, data);
          const { processed } = result;
          this.setState({
            ...this.state,
            status: processed.receipt.status
          });
        } catch (e) {
          console.log('\nCaught exception: ' + e);
          if (e instanceof RpcError)
            console.log(JSON.stringify(e.json, null, 2));
        }
      } else {
        this.setState({
          ...this.state,
          status: 'long'
        });
      }
    };

    this.changeStatus = newStatus => {
      this.setState({
        ...this.state,
        status: newStatus
      });
    };

    this.state = {
      tweet: this.tweet,
      status: '',
      changeStatus: this.changeStatus
    };
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
  Context
};
