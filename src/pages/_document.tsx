import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render(): JSX.Element {
    return (
      <Html lang="ja-JP" dir="ltr">
        <title>UReserve</title>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="UReserve" />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-57x57.png"
            sizes="57x57"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-60x60.png"
            sizes="60x60"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-72x72.png"
            sizes="72x72"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-76x76.png"
            sizes="76x76"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-114x114.png"
            sizes="114x114"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-120x120.png"
            sizes="120x120"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-144x144.png"
            sizes="144x144"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-152x152.png"
            sizes="152x152"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-180x180.png"
            sizes="180x180"
          />
          <meta
            name="msapplication-TileImage"
            content="/icons/app-icon-144x144.png"
          />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="theme-color" content="#282c34" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
