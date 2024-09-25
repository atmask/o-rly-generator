import Link from "next/link";

const OrlyFooter = () => {
  return (
    <>
      <footer className="mb-2 mt-auto w-full text-center font-mono text-gray-600">
        <div>
          <p>
            Open source on{" "}
            <Link
              href="https://github.com/denitdao/o-rly-generator"
              target="_blank"
              className="text-blue-500 underline hover:text-blue-700"
            >
              GitHub
            </Link>
            {" | "}
            Explore full book collection on{" "}
            <Link
              href="https://orlybooks.com"
              target="_blank"
              className="text-blue-500 underline hover:text-blue-700"
            >
              O&apos;RLY Covers
            </Link>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear() + " Created by "}
            <Link
              href="https://x.com/DChurchyn"
              target="_blank"
              className="text-blue-500 underline hover:text-blue-700"
            >
              DenITDao
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default OrlyFooter;
