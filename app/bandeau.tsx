"use client";

// import as : import SpawnBandeau from "./bandeau";
// use as : <SpawnBandeau title="..." />
export default function SpawnBandeau({ title } : { title: string }) {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      </div>
    </header>
  );
}
