import React, { useContext } from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import Login from './components/Login';
import Account from './contexts/Account';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  width: 40%;
`;

const Right = styled.div`
  width: 60%;
`;

const switchLeft = (account) => {
  if(account) {
    return (
      <>
        <Profile/>
        <TweetForm/>
      </>
    );
  } else {
    return <Login/>;
  }
}

const App = () => {
  const { account } = useContext(Account.Context) || {};
  return (
    <Wrapper>
      <Left>
        {switchLeft(account)}
      </Left>
      <Right>
        <TweetList/>
      </Right>
    </Wrapper>
  )
};
export default App;
