"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { TMenu } from "@/types/client/menu-type";
import { MenuIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Search, { SearchSkeleton } from "@/components/layout/navbar/search";
import { SwitchTheme } from "@/components/custom/switch-theme";

interface IMobileMenu {
    menu: TMenu[];
}

export default function MobileMenu({ menu }: IMobileMenu) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname, searchParams]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    aria-label="Open mobile menu"
                >
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="mb-4 text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mb-4 w-full flex items-center gap-4">
                    <Suspense fallback={<SearchSkeleton />}>
                        <Search />
                    </Suspense>
                    <Suspense fallback={null}>
                        <SwitchTheme />
                    </Suspense>
                </div>
                <nav>
                    <ul className="space-y-4">
                        {menu.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.path}
                                    className={`block transition-colors underline-offset-4 hover:underline text-foreground ${
                                        pathname === item.path
                                            ? "text-primary"
                                            : ""
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
