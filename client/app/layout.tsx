import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
                <main> {children}</main>
                <Toaster expand={false} richColors />
            </body>
        </html>
    );
}
