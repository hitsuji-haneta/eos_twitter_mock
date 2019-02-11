import React, { useState, useEffect, useRef } from 'react';

import { RpcError } from 'eosjs';
import rpc from '../shared/rpc';

const Context = React.createContext();

const initialState = {
  posts: [],
  isLoading: true,
};

const Provider = ({children}) => {
  const [state, setState] = useState(initialState);
  const fetchPosts = async () => {
    try {
      const resp = await rpc.get_table_rows({
        json: true,
        code: 'twitter',
        scope: 'twitter',
        table: 'posts',
        limit: 100,
      });
      if (!resp.rows || resp.rows.length === 0) throw Error('get no rows');
      setState({
        ...state,
        posts: resp.rows,
        isLoading: true,
      });
    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
  };

  const isFirstRef = useRef(true);
  useEffect(() => {
    if(isFirstRef.current) {
      fetchPosts();
      isFirstRef.current = false;
    }
  });

  return <Context.Provider value={{state, fetchPosts}}>{children}</Context.Provider>
};

export default {
  Provider,
  Context,
};