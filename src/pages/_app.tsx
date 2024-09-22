import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "~/styles/globals.css";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import PostHogAnalyticsProvider from "~/components/meta/PostHogAnalytics";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <PostHogAnalyticsProvider>
        <Component {...pageProps} />
      </PostHogAnalyticsProvider>
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
    </div>
  );
};

export default MyApp;
