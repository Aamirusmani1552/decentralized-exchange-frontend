import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import ActiveContext from "../context/accountContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPH_URI,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <ActiveContext>
          <Component {...pageProps} />
          <Toaster position="bottom-right" reverseOrder={false} />
        </ActiveContext>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default MyApp;
