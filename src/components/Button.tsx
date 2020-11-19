import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';

export const Button: FC = ({ children }) => {
  return <BaseButton>{children}</BaseButton>;
};

const BaseButton = styled.button`
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: none;
`;

export const BlueToggleButton = styled(BaseButton)`
  color: ${({ theme }) => theme.text.white};
  background-color: ${({ theme }) => theme.background.blue};
  border: ${({ theme }) => theme.border.blue};
  &:hover {
    color: ${({ theme }) => theme.text.blue};
    background-color: ${({ theme }) => theme.background.white};
  }
`;

export const BlueBlurButton = styled(BaseButton)`
  color: ${({ theme }) => theme.text.white};
  background-color: ${({ theme }) => theme.background.blue};
  box-shadow: ${({ theme }) => theme.box_shadow.blue};
  &:hover {
    background-color: ${({ theme }) => theme.background.blue_hover};
    box-shadow: ${({ theme }) => theme.box_shadow.blue_hover};
  }
`;
