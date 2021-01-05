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

  render() {
    return (
      <Html lang="ja-JP" dir="ltr">
        <Head>
          <meta name="application-name" content="URLeader" />
          <meta
            name="msapplication-square70x70logo"
            content="/icons/70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/icons/150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/icons/310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/icons/310x310.png"
          />
          <meta name="msapplication-TileColor" content="#282c34" />
          <meta name="theme-color" content="#282c34" />
          <meta
            name="description"
            content="URLと時間を登録して、予定を管理するアプリ"
          />
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
          <link rel="icon" sizes="192x192" href="/icons/192x192.png" />
          <link rel="icon" href="/icons/favicon.ico" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#282c34"
          />
          <meta name="apple-mobile-web-app-title" content="URLeader" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/180x180.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
            rel="stylesheet"
          />
          <script async defer src="https://apis.google.com/js/api.js"></script>
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
