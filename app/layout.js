import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "Outfit",
  subsets: ["latin"],
});

const geistMono = Outfit({
  variable: "Outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Doctor-Booking-App",
  description: "This Software is made by Neeraj Kumar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${outfit.variable} antialiased`}>
        <div className="md:px-20">
          <Header />

          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
