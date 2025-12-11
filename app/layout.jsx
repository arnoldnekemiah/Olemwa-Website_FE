import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Olemwa Chess Club CMS",
    description: "Official website of the Olemwa Chess Club - Promoting chess excellence and building a strong community of players.",
    keywords: ["chess", "Olemwa Chess Club", "tournaments", "chess events", "chess community"],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
