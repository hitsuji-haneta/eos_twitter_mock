import React, { useState } from 'react';

import { RpcError } from 'eosjs';
import rpc from '../shared/rpc';

const Context = React.createContext();

const initialState = {
  id: '',
  name: '',
  mail: '',
  about: '',
  status: '',
};

const Provider = ({children}) => {
  const [state, setState] = useState(initialState);
  const fetchAccountBook = async (id) => {
    setState({
      ...state,
      status: 'loading',
    });
    try {
      const resp = await rpc.get_table_rows({
        json: true,
        code: 'accountbook',
        scope: 'accountbook',
        table: 'people',
        lower_bound: id || 'EMPTY',
        upper_bound: id || 'EMPTY',
        limit: 1,
      });
      if (!resp.rows || resp.rows.length === 0) {
        setState({
          ...state,
          status: 'wrong',
        });
      } else {
        const result = resp.rows[0];
        setState({
          ...state,
          id: result.key,
          name: result.name,
          mail: result.mail,
          about: result.about,
          status: '',
        });
      }
    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
  };

  return <Context.Provider value={{state, fetchAccountBook}}>{children}</Context.Provider>
};

export default {
  Provider,
  Context,
};