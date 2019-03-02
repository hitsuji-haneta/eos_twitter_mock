import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';
import Button from '../shared/Button';
import useActions from '../hooks/useActions';

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
  if (
    actionStatus.actionName === 'update' ||
    actionStatus.actionName === 'erase'
  ) {
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

const EditProfile = ({ toggleEdit }) => {
  const { state, fetchAccountBook, resetAccount } = useContext(Account.Context);
  const { id, name, mail, about } = state;
  const { actionStatus, changeStatus, updateProfile, deleteUser } = useActions();
  const [newName, setName] = useState(name);
  const [newMail, setMail] = useState(mail);
  const [newAbout, setAbout] = useState(about);

  useEffect(() => {
    if (actionStatus.message === 'executed') {
      if (actionStatus.actionName === 'erase') {
        toggleEdit(false);
        resetAccount();
      } else {
        changeStatus('');
        toggleEdit(false);
        fetchAccountBook(id);
      }
    }
  });

  return (
    <Container>
      <Status actionStatus={actionStatus} />
      id:{id}
      <Wrapper>
        name:{' '}
        <Input
          value={newName}
          type='text'
          onChange={e => setName(e.target.value)}
        />
      </Wrapper>
      <Wrapper>
        mail:{' '}
        <Input
          value={newMail}
          type='text'
          onChange={e => setMail(e.target.value)}
        />
      </Wrapper>
      about:
      <InputArea
        value={newAbout}
        rows='5'
        onChange={e => setAbout(e.target.value)}
      />
      <Button onClick={() => updateProfile(id, newName, newMail, newAbout)}>
        submit
      </Button>
      <Message>or</Message>
      <Button onClick={() => deleteUser(id)}>delete</Button>
    </Container>
  );
};

export default EditProfile;
