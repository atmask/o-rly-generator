import Head from "next/head";
import Link from "next/link";
import CoverEditor from "~/components/CoverEditor";

export default function Home() {
  return (
    <>
      <Head>
        <title>O&apos;RLY Cover Generator</title>
        <meta
          name="description"
          content="Generate beautiful book covers about your pain"
        />
        <Link rel="icon" href="./favicon.ico" />
      </Head>
      <div className="min-h-screen min-w-[540px] bg-gradient-to-b from-[#cfd9df] to-[#e2ebf0]">
        <main className="container mx-auto p-4">
          {/* Main Content */}
          <CoverEditor />

          {/* Footer */}
          <footer className="mt-8 w-full text-center text-gray-600">
            <p>
              Created by{" "}
              <a
                href="https://x.com/DChurchyn"
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700"
              >
                DenITDao
              </a>
            </p>
            <p>
              View on{" "}
              <a
                href="https://github.com/denitdao/o-rly-generator"
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700"
              >
                GitHub
              </a>
              {" | "}
              Explore full book collection on{" "}
              <a
                href="https://orlybooks.com/?sort=color"
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700"
              >
                O&apos;RLY Covers
              </a>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
