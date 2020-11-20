import React from 'react';
import { Button } from '../components/Button';
import { BlurButton, ToggleButton } from '../components/Button';

export default {
  title: 'Button',
};

export const Base = () => <Button>PUSH</Button>;

export const Loading = () => <Button loading>PUSH</Button>;

export const PrimaryToggle = () => <ToggleButton primary>PUSH</ToggleButton>;

export const Toggle = () => <ToggleButton>PUSH</ToggleButton>;

export const PrimaryBlur = () => <BlurButton primary>PUSH</BlurButton>;

export const Blur = () => <BlurButton>PUSH</BlurButton>;
