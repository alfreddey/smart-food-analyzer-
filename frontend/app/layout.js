import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="flex flex-col items-center border py-4 tracking-wider font-light">
          <h1>Smart Food Analyzer</h1>
        </header>
        {children}
        <footer className="flex flex-col items-center bg-gray-900 text-white py-2">
          <p>© 2025 Smart Food Analyzer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
