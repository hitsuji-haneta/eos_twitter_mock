import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Action from '../contexts/Action';
import Post from '../contexts/Post';
import Account from '../contexts/Account';
import Button from '../shared/Button';

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;
const Input = styled.textarea`
  width: 95%;
`;
const Message = styled.p`
  color: blue;
`;

const Status = ({status}) => {
  switch (status) {
    case 'executed':
      return <Message>Send your tweet.</Message>
    case 'long':
      return <Message>Too long. 140 characters maximum.</Message>
    default:
      return <></>;
  }
}

const TweetForm = () => {
  const { tweet, status, changeStatus } = useContext(Action.Context) || {};
  const postContext = useContext(Post.Context);
  const { id } = useContext(Account.Context);
  const [text, setText] = useState('');

  useEffect(() => {
    if(status === 'executed') {
      setText('');
      postContext.fetchPosts();
      setTimeout(() => {
        changeStatus('');
      }, 1000);
    };
  });

  return (
    <Wrapper>
      <Status status={status} />
      <Input value={text} rows="5" onChange={(e) => setText(e.target.value)} />
      <Button onClick={() => tweet(text, id)}>tweet</Button>
    </Wrapper>
  );
};

export default TweetForm;