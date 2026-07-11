import "./globals.css";

import Navbar from "@/components/common/Navbar";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />

          <main
            style={{
              padding: "30px",
            }}
          >
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}