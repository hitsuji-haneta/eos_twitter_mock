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
`;

const Input = styled.input`
  width: 50%;
`;

const Status = ({status}) => {
  switch (status) {
    case 'wrong':
      return <p>Invalid account</p>
    case 'loading':
      return <p>Now loading...</p>
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