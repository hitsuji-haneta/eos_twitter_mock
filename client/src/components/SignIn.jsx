import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Action from '../contexts/Action';
import Account from '../contexts/Account';
import Button from '../shared/Button';

const Container = styled.div`
  margin: 20px;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  background-color: white;
`;
const Wrapper = styled.div`
  width: 200px;
  text-align: right;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100px;
`;
const InputArea = styled.textarea`
  width: 200px;
  height: 100px;
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

const SignIn = ({switchLogin}) => {
  const { signIn, status, changeStatus } = useContext(Action.Context) || {};
  const { fetchAccountBook } = useContext(Account.Context) || {};
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    if(status === 'executed') {
      changeStatus('');
      fetchAccountBook(id);
    };
  });

  return (
    <Container>
      <Status status={status} />
      <Wrapper>
        id: <Input value={id} type="text" onChange={(e) => setId(e.target.value)} />
      </Wrapper>
      <Wrapper>
        name: <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      </Wrapper>
      <Wrapper>
        mail: <Input value={mail} type="text" onChange={(e) => setMail(e.target.value)} />
      </Wrapper>
      about:
      <InputArea value={about} rows="5" onChange={(e) => setAbout(e.target.value)} />
      <Button onClick={() => signIn(id, name, mail, about)}>sign in</Button>
      <Message>or</Message>
      <Button onClick={switchLogin}>login</Button>
    </Container>
  );
}

export default SignIn;