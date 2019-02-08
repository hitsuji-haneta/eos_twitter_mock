import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
`;

const Clickable = styled.a`
  color: gray;
  text-decoration: none;
  &: hover { color: black; }
  &: active {
    color: white;
  }
`;

const Text = styled.p`
  font-size: 1.2em;
  width: 100px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
  &: active {
    background-color: black;
  }
`;

const Button = props => (
  <Wrapper>
    <Clickable href='javascript:void(0)' {...props}>
      <Text>{props.children}</Text>
    </Clickable>
  </Wrapper>
);
export default Button;
