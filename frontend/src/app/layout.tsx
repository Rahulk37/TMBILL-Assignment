import "./globals.css";

import Sidebar from "@/components/common/Sidebar";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="ml-64 flex-1 p-8">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
