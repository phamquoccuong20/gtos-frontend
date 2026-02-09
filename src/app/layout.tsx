import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Providers from "@/app/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = { title: "GTOS", description: "…" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
