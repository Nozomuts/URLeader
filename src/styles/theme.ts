import 'styled-components';

export const theme = {
  text: {
    blue: '#067DF7',
    blue_hover: '#68b5fb',
    black: '#000000',
    gray: '#696969',
    white: '#FFFFFF',
  },
  background: {
    gray: '#FAFAFA',
    white: '#FFFFFF',
    white_hover: 'rgba(0,0,0,.02)',
    link_hover: 'rgba(0,118,255,0.1)',
    blue: '#067DF7',
    blue_hover: 'rgba(0,118,255,.9)',
    black: '#000000',
  },
  border: {
    normal: '1px solid #EAEAEA',
    bold: '2px solid #EAEAEA',
    blue: '1px solid #067DF7',
  },
  box_shadow: {
    white: '0 4px 14px 0 rgba(0,0,0,0.1)',
    white_hover: '0 4px 8px rgba(0,0,0,.12)',
    blue: '0 4px 14px 0 rgba(0,118,255,0.39)',
    blue_hover: '0 6px 20px rgba(0,118,255,0.23)',
  },
} as const; // readonlyの型＋名前の型が付く

type AppTheme = typeof theme;

// DefaultThemeという用意された空っぽの定義に型を注入
declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
