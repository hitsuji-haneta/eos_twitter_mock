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

const switchLeft = (id, isLoginForm, switchForm) => {
  if (id) {
    return (
      <>
        <Profile />
        <TweetForm />
      </>
    );
  } else {
    return isLoginForm ? (
      <Login switchSignIn={() => switchForm(false)} />
    ) : (
      <SignIn switchLogin={() => switchForm(true)} />
    );
  }
};

const App = () => {
  const { id } = useContext(Account.Context)
    ? useContext(Account.Context).state
    : {};
  const [isLoginForm, switchForm] = useState(true);

  return (
    <Wrapper>
      <Left>{switchLeft(id, isLoginForm, switchForm)}</Left>
      <Right>
        <TweetList />
      </Right>
    </Wrapper>
  );
};
export default App;
