import { Providers } from "./providers";
import "./globals.css";
import TanStackProviders from "./tankstack-provider";
import { Toaster } from "@/src/components/ui/toaster";
import { ModalProvider } from "@/src/contexts/ModalContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <Toaster />
          <TanStackProviders>
            <ModalProvider>{children}</ModalProvider>
          </TanStackProviders>
        </Providers>
      </body>
    </html>
  );
}
