import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import { Layout } from "../partials/Layout";
import { useState, createContext } from "react";
import AppContext from "../components/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [isSiteContaminated, setIsSiteContaminated] = useState(false);


  return (
    <AppContext.Provider value={{ isLoopActive, setIsLoopActive, isSiteContaminated, setIsSiteContaminated }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
