import { FC } from "react";
import { Header } from "../components/Header";
import { FormspreeProvider } from "@formspree/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { is_sp } from "../util";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Wrapper: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};
