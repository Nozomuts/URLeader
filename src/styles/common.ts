import styled, { keyframes } from 'styled-components';
import { BORDER } from './util';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: ${BORDER.GRAY_BOLD};
  border-right: ${BORDER.GRAY_BOLD};
  border-bottom: ${BORDER.GRAY_BOLD};
  border-left: ${BORDER.WHITE_BOLD};
  background: transparent;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
