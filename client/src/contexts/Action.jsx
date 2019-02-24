import React, { useState } from 'react';
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

const Provider = ({children}) => {
  const changeStatus = newStatus => {
    setState({
      ...state,
      actionStatus: newStatus
    });
  };

  const tweet = async (text, id) => {
    if (text.length < 140) {
      try {
        const data = {
          user: id,
          text: text,
          tweeted_at: new Date().getTime()
        };
        const result = await action('twitter', 'tweet', id, data);
        const { processed } = result;
        setState({
          ...state,
          actionStatus: processed.receipt.status
        });
      } catch (e) {
        let status = e;
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) {
          status += `: ${e.json.error.what}`;
          console.log(JSON.stringify(e.json, null, 2));
        }
        setState({
          ...state,
          status,
        });
      }
    } else {
      setState({
        ...state,
        actionStatus: 'long'
      });
    }
  };

  const signIn = async (id, name, mail, about) => {
    setState({
      ...state,
      actionStatus: 'loading',
    });
    try {
      const data = {
        user: id,
        name,
        mail,
        about,
      };
      const result = await action('accountbook', 'create', id, data);
      const { processed } = result;
      setState({
        ...state,
        actionStatus: processed.receipt.status,
      });
    } catch (e) {
      setState({
        ...state,
        actionStatus: 'wrong',
      });
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
    }
  };

  const updateProfile = async (id, name, mail, about) => {
    setState({
      ...state,
      actionStatus: 'loading',
    });
    try {
      const data = {
        user: id,
        name,
        mail,
        about,
      };
      const result = await action('accountbook', 'update', id, data);
      const { processed } = result;
      setState({
        ...state,
        actionStatus: processed.receipt.status,
      });
    } catch (e) {
      setState({
        ...state,
        actionStatus: 'wrong',
      });
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
    }
  };

  const deleteUser = async (id) => {
    setState({
      ...state,
      actionStatus: 'loading',
    });
    try {
      const result = await action('accountbook', 'delete', id);
      const { processed } = result;
      setState({
        ...state,
        actionStatus: processed.receipt.status,
      });
    } catch (e) {
      setState({
        ...state,
        actionStatus: 'wrong',
      });
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
    }
  };

  const initialState = {
    actionStatus: '',
    tweet,
    signIn,
    updateProfile,
    changeStatus,
    deleteUser,
  };
  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};

export default {
  Provider,
  Context
};
