import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "~/styles/globals.css";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import PostHogAnalyticsProvider from "~/components/meta/PostHogAnalytics";
import { cn } from "~/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn(GeistSans.variable, GeistMono.variable, "font-sans")}>
      <PostHogAnalyticsProvider>
        <Component {...pageProps} />
      </PostHogAnalyticsProvider>
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
    </div>
  );
};

export default MyApp;
