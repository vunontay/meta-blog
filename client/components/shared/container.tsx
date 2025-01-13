import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Container({
    children,
    className,
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4",
                "sm:max-w-[390px] sm:px-0",
                "md:max-w-[834px]",
                "lg:max-w-[1218px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
