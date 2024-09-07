import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto mt-36 flex max-w-7xl justify-center">
      {children}
    </main>
  );
}
