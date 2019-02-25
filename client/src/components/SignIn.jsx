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
  margin: 5px auto;
  color: ${props => props.color || 'black'};
`;

const Status = ({ actionStatus }) => {
  if (actionStatus.actionName === 'create') {
    switch (actionStatus.message) {
      case 'loading':
        return <Message color='blue'>Now loading...</Message>;
      case '':
        return <></>;
      default:
        return <Message color='red'>{actionStatus.message}</Message>;
    }
  } else {
    return <></>;
  }
};

const SignIn = ({ switchLogin }) => {
  const { signIn, actionStatus, changeStatus } =
    useContext(Action.Context) || {};
  const { fetchAccountBook } = useContext(Account.Context) || {};
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (
      actionStatus.actionName === 'create' &&
      actionStatus.message === 'executed'
    ) {
      changeStatus('');
      fetchAccountBook(id);
    }
  });

  return (
    <Container>
      <Status actionStatus={actionStatus} />
      <Wrapper>
        id:{' '}
        <Input value={id} type='text' onChange={e => setId(e.target.value)} />
      </Wrapper>
      <Wrapper>
        name:{' '}
        <Input
          value={name}
          type='text'
          onChange={e => setName(e.target.value)}
        />
      </Wrapper>
      <Wrapper>
        mail:{' '}
        <Input
          value={mail}
          type='text'
          onChange={e => setMail(e.target.value)}
        />
      </Wrapper>
      about:
      <InputArea
        value={about}
        rows='5'
        onChange={e => setAbout(e.target.value)}
      />
      <Button onClick={() => signIn(id, name, mail, about)}>sign in</Button>
      <Message>or</Message>
      <Button onClick={switchLogin}>login</Button>
    </Container>
  );
};

export default SignIn;
