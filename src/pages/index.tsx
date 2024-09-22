import CoverEditor from "~/components/CoverEditor";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";

export default function Home() {
  return (
    <>
      <OrlyHead />
      <div className="flex min-h-screen min-w-[540px] flex-col bg-gradient-to-b from-[#cfd9df] to-[#e2ebf0]">
        <main className="container mx-auto p-4">
          <CoverEditor />
        </main>
        <OrlyFooter />
      </div>
    </>
  );
}
