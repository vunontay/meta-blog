import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const workSans = Work_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Meta Blog",
        template: `%s | Meta Blog`,
    },
    description:
        "Meta Blog là nơi chia sẻ kiến thức chuyên sâu về công nghệ, SEO, lập trình, và phát triển web. Cập nhật những thông tin hữu ích nhất để cải thiện kỹ năng của bạn!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${workSans.className} antialiased`}>
                <Navbar />
                <main> {children}</main>
                <Footer />
            </body>
        </html>
    );
}
