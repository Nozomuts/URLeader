import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import { Reset } from 'styled-reset';
import '../styles/index.css';
// csspropを使うために型をインポート
import type {} from 'styled-components/cssprop';

/**
 * クライアント側のレンダリングカスタマイズ
 * 全てのpageをラップ
 */
export default function App({ Component, pageProps }: AppProps) {
  // サーバー側に挿入されたCSSを削除
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <Reset />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
