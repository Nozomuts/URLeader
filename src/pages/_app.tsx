import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Wrapper } from "../components/Wrapper";
import { store } from "../redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper store={store}>
      <Component {...pageProps} />
    </Wrapper>
  );
}
