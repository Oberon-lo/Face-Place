import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import Post from './../components/PostDisplay/Post';
import Comments from './../components/PostDisplay/Comments';
import {}


let container = null 

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Renders posts', () => {
  act(() => {
    render(<Post />, container)
  })
  // ! TODO: finish this
  expect(container.)
});

it('renders comments', () => {
  act(() => {
    render(<Comments />,  container)
  })
  // ! TODO: finish this
});

it()