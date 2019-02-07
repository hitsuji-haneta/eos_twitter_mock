import React from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';

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
      <TweetForm/>
    </Left>
    <Right>
      <TweetList/>
    </Right>
  </Wrapper>
);
export default App;
