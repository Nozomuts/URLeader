import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * サーバー側のレンダリングカスタマイズ
 */
export default class MyDocument extends Document {
  /**
   * レンダリング前に実行される
   */
  static async getInitialProps(ctx: DocumentContext) {
    // サーバ側のレンダリングに処理を追加していると思われる
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            // App -> _app.tsx
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
