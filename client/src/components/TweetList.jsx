import React, { useContext } from 'react';
import styled from 'styled-components';
import Post from '../contexts/Post';
import TweetItem from './TweetItem';
import Button from '../shared/Button';

const Wrapper = styled.div`
  margin: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TweetList = () => {
  const { state, fetchPosts } = useContext(Post.Context) || {};
  const posts = state
    ? state.posts.sort((a, b) => b.tweeted_at - a.tweeted_at)
    : [];
  return (
    <>
      <Wrapper>
        {posts.map((post, index) => (
          <TweetItem key={index} post={post} />
        ))}
      </Wrapper>
      <ButtonWrapper>
        <Button onClick={() => fetchPosts()}>more!!</Button>
      </ButtonWrapper>
    </>
  );
};

export default TweetList;
