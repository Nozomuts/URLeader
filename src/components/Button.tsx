import React, { FC } from 'react';
import styled from 'styled-components';
import { BORDER, COLOR, SHADOW, TEXT_COLOR } from '../styles/util';
import { Spinner } from '../styles/common';

type Props = {
  loading?: boolean;
};

export const Button: FC<Props> = ({ children, loading }) => {
  return <BaseButton>{loading ? <Spinner /> : children}</BaseButton>;
};

export const BaseButton = styled.button`
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: none;
`;

export const ToggleButton = styled(BaseButton)<{ primary?: boolean }>`
  color: ${TEXT_COLOR.WHITE};
  background-color: ${({ primary }) => (primary ? COLOR.BLUE : COLOR.BLACK)};
  border: ${({ primary }) => (primary ? BORDER.BLUE : BORDER.BLACK)};
  &:hover {
    background-color: ${COLOR.WHITE};
    color: ${({ primary }) => (primary ? TEXT_COLOR.BLUE : TEXT_COLOR.BLACK)};
  }
`;

export const BlurButton = styled(BaseButton)<{ primary?: boolean }>`
  color: ${({ primary }) => (primary ? TEXT_COLOR.WHITE : TEXT_COLOR.BLACK)};
  background-color: ${({ primary }) => (primary ? COLOR.BLUE : COLOR.WHITE)};
  box-shadow: ${({ primary }) => (primary ? SHADOW.BLUE : SHADOW.WHITE)};
  &:hover {
    background-color: ${({ primary }) =>
      primary ? COLOR.BLUE_HOVER : COLOR.WHITE_HOVER};
    box-shadow: ${({ primary }) =>
      primary ? SHADOW.BLUE_HOVER : SHADOW.WHITE_HOVER};
  }
`;
