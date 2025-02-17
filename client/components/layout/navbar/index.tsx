import Search, { SearchSkeleton } from "./search";
import { MENU } from "@/constants/server/menu-constant";
import { Suspense } from "react";
import { SwitchTheme } from "@/components/custom/switch-theme";
import { getSession } from "@/lib/session";
import Link from "next/link";
import LogoSquare from "@/components/shared/logo-square";
import Container from "@/components/shared/container";
import MobileMenu from "@/components/layout/navbar/mobile-menu";

export async function Navbar() {
    const session = await getSession();
    console.log(session);
    return (
        <header className="sticky top-0 z-10 bg-card shadow-md">
            <Container>
                <nav className="flex items-center justify-between py-4 md:py-8">
                    {/* Mobile Menu */}
                    <div className="block flex-none md:hidden">
                        <Suspense fallback={null}>
                            <MobileMenu menu={MENU} />
                        </Suspense>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center flex-none ">
                        <Link href="/" prefetch={true}>
                            <LogoSquare className="md:w-auto w-[158px] h-[36px] object-contain" />
                        </Link>
                    </div>

                    {/* Menu (Centered) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        {MENU.length ? (
                            <ul className="flex gap-[20px] lg:gap-[40px] text-md ">
                                {MENU.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.path}
                                            prefetch={true}
                                            className="underline-offset-4 hover:underline text-foreground"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    {/* Search and Theme Toggle */}
                    <div className="hidden md:flex items-center justify-end flex-none gap-4 lg:gap-8">
                        <Suspense fallback={<SearchSkeleton />}>
                            <Search />
                        </Suspense>
                        <Suspense fallback={null}>
                            <SwitchTheme />
                        </Suspense>
                    </div>
                </nav>
            </Container>
        </header>
    );
}
