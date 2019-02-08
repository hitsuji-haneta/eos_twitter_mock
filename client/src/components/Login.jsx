import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';
import Button from '../shared/Button';

const Wrapper = styled.div`
  margin: 20px;
  height: 250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  background-color: white;
`;
const Input = styled.input`
  width: 50%;
`;
const Message = styled.p`
  margin: 0 auto;
  color: ${props => props.color || "black"};
`;

const Status = ({status}) => {
  switch (status) {
    case 'wrong':
      return <Message color='blue'>Invalid account</Message>
    case 'loading':
      return <Message color='blue'>Now loading...</Message>
    default:
      return <></>;
  }
}

const Login = ({switchSignIn}) => {
  const { fetchAccountBook, status } = useContext(Account.Context) || {};
  const [name, setName] = useState('');

  return (
    <Wrapper>
      <Status status={status} />
      <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => fetchAccountBook(name)}>login</Button>
      <Message>or</Message>
      <Button onClick={switchSignIn}>sign in</Button>
    </Wrapper>
  );
}

export default Login;