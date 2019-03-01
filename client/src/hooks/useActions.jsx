import React, { useState } from 'react';
import { Api, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import rpc from '../shared/rpc';

const defaultPrivateKey = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const api = new Api({ rpc, signatureProvider });

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

const handleAction = async (contractName, actionName, id, data, actionStatus, setActionStatus) => {
  setActionStatus({
      ...actionStatus,
      message: 'loading',
  });
  try {
    const result = await action(contractName, actionName, id, data);
    const { processed } = result;
    setActionStatus({
      actionName,
      message: processed.receipt.status,
    });
  } catch (e) {
    let message = '';
    console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError) {
      message = e.json.error.what;
      console.log(JSON.stringify(e.json, null, 2));
    } else {
      message = e;
    }
    setActionStatus({
      actionName,
      message,
    });
  }
};

const useActions = () => {
  const changeStatus = newStatus => {
    setActionStatus({
      ...actionStatus,
      message: newStatus,
    });
  };

  const tweet = async (text, id) => {
    if (text.length < 140) {
      const data = {
        user: id,
        text: text,
        tweeted_at: new Date().getTime()
      };
      handleAction('twitter', 'tweet', id, data, actionStatus, setActionStatus);
    } else {
      setActionStatus({
        actionName: 'tweet',
        message: 'long',
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
    handleAction('accountbook', 'create', id, data, actionStatus, setActionStatus);
  };

  const updateProfile = async (id, name, mail, about) => {
    const data = {
      user: id,
      name,
      mail,
      about
    };
    handleAction('accountbook', 'update', id, data, actionStatus, setActionStatus);
  };

  const deleteUser = async id => {
    const data = {
      user: id
    };
    handleAction('accountbook', 'erase', id, data, actionStatus, setActionStatus);
  };

  const initialStatus = {
    actionName: '',
    message: '',
  };
  const [actionStatus, setActionStatus] = useState(initialStatus);

  return {
    actionStatus,
    tweet,
    signIn,
    updateProfile,
    changeStatus,
    deleteUser,
  };
};

export default useActions();
