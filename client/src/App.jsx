import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import Login from './components/Login';
import SignIn from './components/SignIn';
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

const switchLeft = (id, isLogin, switchLogin) => {
  if (id) {
    return (
      <>
        <Profile />
        <TweetForm />
      </>
    );
  } else {
    return isLogin ? (
      <Login switchSignIn={() => switchLogin(false)} />
    ) : (
      <SignIn switchLogin={() => switchLogin(true)} />
    );
  }
};

const App = () => {
  const { id } = useContext(Account.Context) || {};
  const [isLogin, switchLogin] = useState(true);

  return (
    <Wrapper>
      <Left>{switchLeft(id, isLogin, switchLogin)}</Left>
      <Right>
        <TweetList />
      </Right>
    </Wrapper>
  );
};
export default App;
