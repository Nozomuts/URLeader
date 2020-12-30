import React from "react";
import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Header } from "../components/Header";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
