import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  border-style: solid;
  border-width: 1px;
`;

const TweetedAt = styled.p`
  font-size: 0.8em;
  font-color: gray;
`;

const Text = styled.p`
  font-size: 1.2em;
`;

const User = styled.p`
  font-size: 1.0em;
  text-align: right;
`;

const TweetItem = ({post}) => {
  console.log(post);
  const d = new Date(Number(post.tweeted_at));
  const tweetedAt =
    `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`
  const { user, text } = post;
  return (
    <Wrapper>
      <TweetedAt>{tweetedAt}</TweetedAt>
      <Text>{text}</Text>
      <User>{user}</User>
    </Wrapper>
  );
}

export default TweetItem;