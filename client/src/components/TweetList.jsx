import React, { useContext } from 'react';
import styled from 'styled-components';
import Post from '../contexts/Post';

const Wrapper = styled.div`
  margin: 20px;
  border-style: solid;
  border-width: 1px;
`;

const TweetList = () => {
  const { posts } = useContext(Post.Context) || { posts: [] };
  return (
    <Wrapper>
      { posts.map((post, index) => <p key={index}>{post.text}</p>)}
    </Wrapper>
  );
}

export default TweetList;