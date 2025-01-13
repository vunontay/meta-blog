"use client";

import { TMenu } from "@/types/client/menu-type";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IFooterMenuProps {
    menu: TMenu[];
}

export function FooterMenuItem({ item }: { item: TMenu }) {
    const pathname = usePathname();
    const [active, setActive] = useState(pathname === item.path);

    useEffect(() => {
        setActive(pathname === item.path);
    }, [pathname, item.path]);

    return (
        <li>
            <Link
                href={item.path}
                className={clsx(
                    "py-2 block text-foreground first:pt-0 hover:underline",
                    {
                        "underline underline-offset-4 dark:text-neutral-300":
                            active,
                    }
                )}
            >
                {item.title}
            </Link>
        </li>
    );
}

export default function FooterMenu({ menu }: IFooterMenuProps) {
    if (!menu.length) return null;

    return (
        <nav>
            <ul>
                {menu.map((item: TMenu) => {
                    return <FooterMenuItem key={item.title} item={item} />;
                })}
            </ul>
        </nav>
    );
}
