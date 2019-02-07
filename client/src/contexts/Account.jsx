import * as React from 'react';

import { RpcError } from 'eosjs';
import rpc from '../shared/rpc';

const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAccountBook = async (name) => {
      this.setState({
        ...this.state,
        status: 'loading',
      });
      try {
        const resp = await rpc.get_table_rows({
          json: true,
          code: 'accountbook',
          scope: 'accountbook',
          table: 'people',
          lower_bound: name || 'EMPTY',
          upper_bound: name || 'EMPTY',
          limit: 1,
        });
        if (!resp.rows || resp.rows.length === 0) {
          this.setState({
            ...this.state,
            status: 'wrong',
          });
        } else {
          const result = resp.rows[0];
          this.setState({
            ...this.state,
            account: result.key,
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

    this.state = {
      account: '',
      name: '',
      mail: '',
      about: '',
      fetchAccountBook: this.fetchAccountBook,
      status: '',
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