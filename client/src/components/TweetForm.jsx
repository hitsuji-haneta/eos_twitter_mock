import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Post from '../contexts/Post';
import Account from '../contexts/Account';
import Button from '../shared/Button';
import useActions from '../hooks/useActions';

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
  margin: 5px auto;
  color: ${props => props.color || 'black'};
`;

const Status = ({ actionStatus }) => {
  if (actionStatus.actionName === 'tweet') {
    switch (actionStatus.message) {
      case 'executed':
        return <Message color='blue'>Send your tweet.</Message>;
      case 'long':
        return <Message color='red'>Too long. 140 characters maximum.</Message>;
      case '':
        return <></>;
      default:
        return <Message color='red'>{actionStatus.message}</Message>;
    }
  } else {
    return <></>;
  }
};

const TweetForm = () => {
  const { tweet, actionStatus, changeStatus } = useActions();
  const postContext = useContext(Post.Context);
  const { id } = useContext(Account.Context).state;
  const [text, setText] = useState('');

  useEffect(() => {
    if (
      actionStatus.actionName === 'tweet' &&
      actionStatus.message === 'executed'
    ) {
      setText('');
      postContext.fetchPosts();
      setTimeout(() => {
        changeStatus('');
      }, 1000);
    }
  });

  return (
    <Wrapper>
      <Status actionStatus={actionStatus} />
      <Input value={text} rows='5' onChange={e => setText(e.target.value)} />
      <Button onClick={() => tweet(text, id)}>tweet</Button>
    </Wrapper>
  );
};

export default TweetForm;
