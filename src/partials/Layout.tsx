import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export function Layout(props: LayoutProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="author" content="Autor do Site" />
        <meta name="keywords" content="tags" />
        <meta name="description" content="Descrição do site aqui" />

      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
