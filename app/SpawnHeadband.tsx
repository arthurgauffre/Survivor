"use client";

// import as : import SpawnHeadband from "./bandeau";
// use as : <SpawnHeadband title="..."> content </SpawnHeadband>
export default function SpawnHeadband({ title,  children } : { title: string,  children: React.ReactNode }) {
  return (
    <>
    <header className="bg-white shadow">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      </div>
    </header>
          <main>
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        </>
  );
}
