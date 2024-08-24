import "./globals.css";
import Header from "../layouts/Header";
import ProviderWrapper from "./ProviderWrapper";
import Footer from "@/layouts/Footer";

export const metadata = {
  title: "My Next.js App",
  description: "A Next.js app with Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
