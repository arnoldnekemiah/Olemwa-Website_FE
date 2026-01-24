import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Olemwa Sports Club CMS",
    description: "Official website of the Olemwa Sports Club - Promoting sports excellence and building a strong community of athletes.",
    keywords: ["sports", "Olemwa Sports Club", "tournaments", "sports events", "sports community", "athletics"],
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
