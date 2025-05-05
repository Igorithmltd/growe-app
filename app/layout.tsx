import { Providers } from "./providers";
import "./globals.css";
import TanStackProviders from "./tankstack-provider";
import { Toaster } from "@/src/components/ui/toaster";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <Toaster />
          <TanStackProviders>{children}</TanStackProviders>
        </Providers>
      </body>
    </html>
  );
}
