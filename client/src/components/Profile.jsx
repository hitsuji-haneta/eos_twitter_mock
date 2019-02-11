import React, { useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';
import Button from '../shared/Button';

const Container = styled.div`
  margin: 20px;
  height: 250px;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  text-align: center;
  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const Profile = () => {
  const { id, name, mail, about } = useContext(Account.Context).state || {
    id: '',
    name: '',
    mail: '',
    about: '',
  };

  return (
    <Container>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>{mail}</p>
      <p>{about}</p>
      <Wrapper>
        <Button onClick={() => console.log('updateProfile')}>Update</Button>
        <Button onClick={() => console.log('deleteAccount')}>Delete</Button>
      </Wrapper>
    </Container>
  );
};

export default Profile;
