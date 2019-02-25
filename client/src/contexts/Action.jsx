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

const handleAction = async (contractName, actionName, id, data, state, setState) => {
  setState({
    ...state,
    actionStatus: 'loading'
  });
  try {
    const result = await action(contractName, actionName, id, data);
    const { processed } = result;
    setState({
      ...state,
      actionStatus: processed.receipt.status
    });
  } catch (e) {
    let actionStatus;
    console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError) {
      actionStatus = e.json.error.what;
      console.log(JSON.stringify(e.json, null, 2));
    } else {
      actionStatus = e;
    }
    setState({
      ...state,
      actionStatus
    });
  }
};

const Provider = ({ children }) => {
  const changeStatus = newStatus => {
    setState({
      ...state,
      actionStatus: newStatus
    });
  };

  const tweet = async (text, id) => {
    if (text.length < 140) {
      const data = {
        user: id,
        text: text,
        tweeted_at: new Date().getTime()
      };
      handleAction('twitter', 'tweet', id, data, state, setState);
    } else {
      setState({
        ...state,
        actionStatus: 'long'
      });
    }
  };

  const signIn = async (id, name, mail, about) => {
    const data = {
      user: id,
      name,
      mail,
      about
    };
    handleAction('accountbook', 'create', id, data, state, setState);
  };

  const updateProfile = async (id, name, mail, about) => {
    const data = {
      user: id,
      name,
      mail,
      about
    };
    handleAction('accountbook', 'update', id, data, state, setState);
  };

  const deleteUser = async id => {
    const data = {
      user: id
    };
    handleAction('accountbook', 'erase', id, data, state, setState);
  };

  const initialState = {
    actionStatus: '',
    tweet,
    signIn,
    updateProfile,
    changeStatus,
    deleteUser
  };
  const [state, setState] = useState(initialState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default {
  Provider,
  Context
};
