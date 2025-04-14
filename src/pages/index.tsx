import CoverEditor from "~/components/CoverEditor";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";

export default function Home() {
  return (
    <>
      <OrlyHead />
      <div className="flex min-h-screen min-w-[540px] flex-col bg-gray-100">
        <main className="container mx-auto p-4">
          <CoverEditor />
        </main>
        <OrlyFooter />
      </div>
    </>
  );
}
