import { Providers } from "./providers";
import "./globals.css";
import TanStackProviders from "./tankstack-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <TanStackProviders>{children}</TanStackProviders>
        </Providers>
      </body>
    </html>
  );
}
