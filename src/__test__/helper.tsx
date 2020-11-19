import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import { theme } from '../styles/theme';

/** wrapして、Styled Componentsの依存を解決 */
export const renderStyled: (Component: JSX.Element) => RenderResult = (
  Component
) => render(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);
