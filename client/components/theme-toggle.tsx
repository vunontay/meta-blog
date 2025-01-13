"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SwitchTheme } from "@/components/custom/switch-theme";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Ensure component is mounted before rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Determine if the theme is dark
    const isDarkMode = theme === "dark";

    return (
        <div className="flex items-center space-x-2">
            <SwitchTheme
                checked={isDarkMode}
                onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                }
            />
        </div>
    );
}
