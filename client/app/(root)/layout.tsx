import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <>{children}</>
            <Footer />
        </>
    );
}
