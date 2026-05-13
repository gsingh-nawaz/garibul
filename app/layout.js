import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Collins | Creative Designer",
  description: "Portfolio of Collins Harrington",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
