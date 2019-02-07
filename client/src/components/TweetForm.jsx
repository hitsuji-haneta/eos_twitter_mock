import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Action from '../contexts/Action';
import Button from '../shared/Button';

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;

const Input = styled.textarea`
  width: 95%;
`;

const Profile = () => {
  const actionContext = useContext(Action.Context) || {};
  const [text, setText] = useState('');
  return (
    <Wrapper>
      <Input value={text} rows="5" onChange={(e) => setText(e.target.value)} />
      <Button onClick={() => actionContext.tweet(text)}>tweet</Button>
    </Wrapper>
  );
};

export default Profile;