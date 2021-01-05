import { useEffect } from "react";
import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { FormspreeProvider } from "@formspree/react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("Notification" in window) {
      const permission = Notification.permission;

      if (permission === "denied" || permission === "granted") {
        return;
      }

      Notification.requestPermission().then(() => new Notification("テスト"));
    }
  }, []);

  return (
    <FormspreeProvider project="1580105528896388832">
      <Header />
      <Component {...pageProps} />
      <Head>
        <title>URLeader</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </FormspreeProvider>
  );
}
