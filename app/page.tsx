import SpawnBandeau from "./bandeau";

export default function Home() {
  return (
    <div>
      <SpawnBandeau title="Dashboard" />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1>Home</h1>
        </div>
      </main>
    </div>
  );
}
