import Head from "next/head";

/**
 * Smart head component for the page to update meta tags.
 */
const OrlyHead = () => {
  const title = "O'RLY Cover Generator";
  const description =
    "Make O'RLY meme book cover. Use for your programming arguments. ORLY book parodies. Funny programming book covers. O RLY?";
  const imageUrl = `https://make.orlybooks.com/seo/og.png`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Make O'RLY meme book cover. Use for your programming arguments. ORLY book parodies. Funny programming book covers. O'Reilly books meme. Parody covers. O RLY books."
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href="https://make.orlybooks.com" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:logo" content="/apple-touch-icon.png" />
      <meta property="og:url" content="https://make.orlybooks.com" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="O'RLY Cover Generator" />
      <meta property="og:determiner" content="the" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default OrlyHead;
