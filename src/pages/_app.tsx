import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { outfit } from "~/ui/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main id="main" className={`${outfit.className} relative`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
