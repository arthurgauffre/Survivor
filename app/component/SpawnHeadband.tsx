"use client";

// import as : import SpawnHeadband from "./bandeau";
// use as : <SpawnHeadband title="..."> content </SpawnHeadband>
export default function SpawnHeadband({
  title,
  littleText,
  elemRight,
  children,
}: {
  title: string;
  littleText?: string;
  elemRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="pt-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            {littleText && (
              <div className="py-4">
                <p className="text-sm text-gray-500">{littleText}</p>
              </div>
            )}
          </div>
          <div className="place-self-center">{elemRight}</div>
        </div>
      </header>
      <main>
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
