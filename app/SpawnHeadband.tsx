"use client";

// import as : import SpawnHeadband from "./bandeau";
// use as : <SpawnHeadband title="..."> content </SpawnHeadband>
export default function SpawnHeadband({
  title,
  litletext,
  children,
}: {
  title: string;
  litletext?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="pt-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      {litletext && (
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">{litletext}</p>
        </div>
      )}
      <main>
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
