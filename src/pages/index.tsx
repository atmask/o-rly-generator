import CoverEditor from "~/components/CoverEditor";
import OrlyHead from "~/components/meta/OrlyHead";

export default function Home() {
  return (
    <>
      <OrlyHead />
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
                href="https://orlybooks.com"
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
