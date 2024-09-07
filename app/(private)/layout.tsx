import NavBar from "@/app/components/navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar/>
      {children}
    </main>
  );
}
