import React from 'react';
import { BlueBlurButton, BlueToggleButton } from '../src/components/Button';
import { theme } from '../src/styles/theme';

export default {
  title: 'Button',
};

export const BlueToggle = () => (
  <BlueToggleButton theme={theme}>PUSH</BlueToggleButton>
);

export const BlueBlur = () => (
  <BlueBlurButton theme={theme}>PUSH</BlueBlurButton>
);
