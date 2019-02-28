import React, { useState } from 'react';

import { RpcError } from 'eosjs';
import rpc from '../shared/rpc';

const emptyAccount = {
  id: '',
  name: '',
  mail: '',
  about: '',
  status: '',
};

const useAccount = () => {
  const [account, setAccount] = useState(emptyAccount);
  const resetAccount = () => {
    setAccount(emptyAccount);
  };

  const fetchAccountBook = async (id) => {
    setAccount({
      ...account,
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
        setAccount({
          ...account,
          status: 'wrong',
        });
      } else {
        const result = resp.rows[0];
        setAccount({
          ...account,
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

  return { account, resetAccount, fetchAccountBook };
};

export default useAccount;