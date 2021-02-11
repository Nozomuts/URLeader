import { FC } from "react";
import { Header } from "../components/Header";
import { FormspreeProvider } from "@formspree/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { is_sp } from "../util";
import { Provider } from "../redux";

export const Wrapper: FC = ({ children }) => {
  return (
    <Provider>
      <FormspreeProvider project={process.env.PROJECT_ID || ""}>
        <ToastContainer
          toastStyle={{
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
        <Header />
        {children}
        <Head>
          <title>URLeader</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </FormspreeProvider>
    </Provider>
  );
};
