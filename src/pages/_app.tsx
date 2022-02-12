import type { AppProps } from "next/app";

import "../../styles/style.css";
import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
