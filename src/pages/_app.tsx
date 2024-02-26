import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { inter } from "~/ui/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main id="main" className={`${inter.className} relative`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
