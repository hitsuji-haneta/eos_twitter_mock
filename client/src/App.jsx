import React from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import TweetList from './components/TweetList';

// import { Api, JsonRpc, RpcError } from 'eosjs';
// import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
// const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
// const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
// const rpc = new JsonRpc('http://127.0.0.1:7777');
// const api = new Api({ rpc, signatureProvider });

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  width: 40%;
`;

const Right = styled.div`
  width: 60%;
`;

const App = () => (
  <Wrapper>
    <Left>
      <Profile/>
      {/* <TweetForm></TweetForm> */}
    </Left>
    <Right>
      <TweetList/>
    </Right>
  </Wrapper>
);
export default App;
