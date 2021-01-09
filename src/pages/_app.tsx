import { useEffect } from "react";
import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { FormspreeProvider } from "@formspree/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { is_sp } from "../util";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("Notification" in window) {
      // 通知の許可を求める
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
      <ToastContainer
        toastStyle={{
          borderRadius: "0.375rem",
          backgroundColor: "#282c34",
          color: "#fff",
        }}
        progressStyle={{
          background: "#61dafb",
        }}
        position={is_sp() ? "bottom-center" : "top-right"}
        limit={is_sp() ? 1 : 5}
        autoClose={3000}
      />
    </FormspreeProvider>
  );
}
