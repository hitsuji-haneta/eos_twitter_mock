import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Action from '../contexts/Action';
import Post from '../contexts/Post';
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

const Status = ({status}) => {
  switch (status) {
    case 'executed':
      return <p>Send your tweet.</p>
    case 'long':
      return <p>Too long. 140 characters maximum.</p>
    default:
      return <></>;
  }
}

const TweetForm = () => {
  const { tweet, status, changeStatus } = useContext(Action.Context) || {};
  const postContext = useContext(Post.Context);
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
      <Button onClick={() => tweet(text)}>tweet</Button>
    </Wrapper>
  );
};

export default TweetForm;