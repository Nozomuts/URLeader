import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';

/** レスポンシブに使用 */
export const media = {
  /** スマホサイズ(0〜560px) */
  sp: (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (max-width: 560px) {
      ${css(first, ...interpolations)}
    }
  `,
  /** タブレットサイズ(561〜1024px) */
  tab: (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: 561px) and (max-width: 1024px) {
      ${css(first, ...interpolations)}
    }
  `,
  /** パソコンサイズ(1024px〜) */
  pc: (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: 1025px) {
      ${css(first, ...interpolations)}
    }
  `,
} as const;

/** colorに使用 */
export const TEXT_COLOR = {
  BLUE: '#067DF7',
  BLUE_HOVER: '#68b5fb',
  BLACK: '#000000',
  GRAY: '#696969',
  WHITE: '#FFFFFF',
} as const;

/** background-colorに使用 */
export const COLOR = {
  GRAY: '#FAFAFA',
  WHITE: '#FFFFFF',
  WHITE_HOVER: 'rgba(0,0,0,.02)',
  BLUE: '#067DF7',
  BLUE_HOVER: 'rgba(0,118,255,.9)',
  BLACK: '#000000',
  LINK_HOVER: 'rgba(0,118,255,0.1)',
} as const;

/** borderに使用 */
export const BORDER = {
  GRAY: '1px solid #EAEAEA',
  GRAY_BOLD: '2px solid #EAEAEA',
  BLUE: '1px solid #067DF7',
  BLACK: '1px solid #000000',
  BLACK_BOLD: '2px solid #000000',
  WHITE_BOLD: '2px solid #FFFFFF',
} as const;

/** box-shadowに使用 */
export const SHADOW = {
  WHITE: '0 4px 14px 0 rgba(0,0,0,0.1)',
  WHITE_HOVER: '0 4px 8px rgba(0,0,0,.12)',
  BLUE: '0 4px 14px 0 rgba(0,118,255,0.39)',
  BLUE_HOVER: '0 6px 20px rgba(0,118,255,0.23)',
} as const;
