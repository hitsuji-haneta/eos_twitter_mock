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

const Status = ({actionStatus}) => {
  switch (actionStatus) {
    case 'wrong':
      return <Message color='blue'>Invalid account</Message>
    case 'loading':
      return <Message color='blue'>Now loading...</Message>
    default:
      return <></>;
  }
}

const EditProfile = ({toggleEdit}) => {
  const { state, fetchAccountBook } = useContext(Account.Context);
  const { id, name, mail, about } = state;
  const { actionStatus, changeStatus, updateProfile } = useContext(Action.Context);
  const [newName, setName] = useState(name);
  const [newMail, setMail] = useState(mail);
  const [newAbout, setAbout] = useState(about);

  useEffect(() => {
    if(actionStatus === 'executed') {
      changeStatus('');
      toggleEdit(false);
      fetchAccountBook(id);
    };
  });

  return (
    <Container>
      <Status actionStatus={actionStatus} />
      id:{id}
      <Wrapper>
        name: <Input value={newName} type="text" onChange={(e) => setName(e.target.value)} />
      </Wrapper>
      <Wrapper>
        mail: <Input value={newMail} type="text" onChange={(e) => setMail(e.target.value)} />
      </Wrapper>
      about:
      <InputArea value={newAbout} rows="5" onChange={(e) => setAbout(e.target.value)} />
      <Button onClick={() => updateProfile(id, newName, newMail, newAbout)}>submit</Button>
      <Message>or</Message>
      <Button onClick={()=>console.log('delete')}>delete</Button>
    </Container>
  );
}

export default EditProfile;