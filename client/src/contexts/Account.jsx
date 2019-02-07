import * as React from 'react';

import { JsonRpc, RpcError } from 'eosjs';
const rpc = new JsonRpc('http://127.0.0.1:7777');

const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAccountBook = async () => {
      try {
        const resp = await rpc.get_table_rows({
          json: true,
          code: 'accountbook',
          scope: 'accountbook',
          table: 'people',
          lower_bound: 'alice',
          limit: 1,
        });
        if (!resp.rows || resp.rows[0].length === 0) throw Error('get no rows');
        const result = resp.rows[0];
        this.setState({
          ...this.state,
          account: result.key,
          name: result.name,
          mail: result.mail,
          about: result.about,
          isLoading: false,
        });
      } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
      }
    };

    this.fetchAccountBook();

    this.state = {
      account: '',
      name: '',
      mail: '',
      about: '',
      isLoading: true,
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
  Context,
};