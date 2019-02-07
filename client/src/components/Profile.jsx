import React, { useContext } from 'react';
import styled from 'styled-components';
import Account from '../contexts/Account';

const Wrapper = styled.div`
  margin: 20px;
  border-style: solid;
  border-radius: 10px;
`;

const Profile = () => {
  const { account, name, mail, about } = useContext(Account.Context) || {
    account: '',
    name: '',
    mail: '',
    about: '',
  };

  return (
    <Wrapper>
      <p>id: {account}</p>
      <p>name: {name}</p>
      <p>{mail}</p>
      <p>{about}</p>
    </Wrapper>
  );
};

export default Profile;
