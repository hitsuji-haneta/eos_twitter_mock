import React, { useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';

const Wrapper = styled.div`
  margin: 20px;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  text-align: center;
  background-color: white;
`;

const Profile = () => {
  const { id, name, mail, about } = useContext(Account.Context) || {
    id: '',
    name: '',
    mail: '',
    about: '',
  };

  return (
    <Wrapper>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>{mail}</p>
      <p>{about}</p>
    </Wrapper>
  );
};

export default Profile;
