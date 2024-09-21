import Head from "next/head";
import CoverEditor from "~/components/CoverEditor";

export default function Home() {
  return (
    <>
      <Head>
        <title>Orly Book Cover Generator</title>
        <meta
          name="description"
          content="Generate beautiful book covers about your pain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-[540px] bg-gradient-to-b from-[#cfd9df] to-[#e2ebf0]">
        <CoverEditor />
      </main>
    </>
  );
}
