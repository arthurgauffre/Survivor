import NavBar from "@/app/components/navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="{inter.className} sticky top-0">
          <NavBar/>
          {children}
      </body>
    </html>
  );
}
