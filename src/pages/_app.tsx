import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MeshProvider } from "@meshsdk/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import Layout from "../common/components/Layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MAPA</title>
        <meta name="mapa" content="manage your mapa coin"/>
      </Head>
      <ThemeProvider theme={theme}>
        <MeshProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MeshProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
