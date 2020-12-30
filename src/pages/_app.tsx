import React from "react";
import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { FormspreeProvider } from "@formspree/react";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <FormspreeProvider project="1580105528896388832">
      <Header />
      <Component {...pageProps} />
    </FormspreeProvider>
  );
}
