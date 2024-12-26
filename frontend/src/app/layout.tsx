// import "./globals.css";
// import { Inter } from "next/font/google";
// import Navbar from "../components/NavBar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Laada Protocol",
//   description: "Decentralized Social Media Campaigns and Rewards",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar />
//         <main className="container mx-auto mt-8">{children}</main>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laada Protocol",
  description: "Decentralized Social Media Campaigns and Rewards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
        ></script>
      </head>
      <Providers>
        <body
          className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
