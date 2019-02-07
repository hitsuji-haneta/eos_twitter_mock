import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  border-style: solid;
  border-width: 1px;
`;

const TweetedAt = styled.p`
  font-size: 0.9em;
  color: gray;
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
    `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
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