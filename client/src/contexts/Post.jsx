import * as React from 'react';

import { RpcError } from 'eosjs';
import rpc from '../shared/rpc';

const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.fetchPosts = async () => {
      try {
        const resp = await rpc.get_table_rows({
          json: true,
          code: 'twitter',
          scope: 'twitter',
          table: 'posts',
          limit: 100,
        });
        if (!resp.rows || resp.rows.length === 0) throw Error('get no rows');
        this.setState({
          ...this.state,
          posts: resp.rows,
          isLoading: false,
        });
      } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
      }
    };

    this.fetchPosts();

    this.state = {
      posts: [],
      fetchPosts: this.fetchPosts,
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