import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';
import Button from '../shared/Button';

const Wrapper = styled.div`
  margin: 20px;
  height: 200px;
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
  color: blue;
`;

const Status = ({status}) => {
  switch (status) {
    case 'wrong':
      return <Message>Invalid account</Message>
    case 'loading':
      return <Message>Now loading...</Message>
    default:
      return <></>;
  }
}

const Login = () => {
  const { fetchAccountBook, status } = useContext(Account.Context) || {};
  const [name, setName] = useState('');

  return (
    <Wrapper>
      <Status status={status} />
      <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => fetchAccountBook(name)}>login</Button>
    </Wrapper>
  );
}

export default Login;