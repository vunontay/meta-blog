"use client";

import Form from "next/form";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Search() {
    const searchParams = useSearchParams();

    return (
        <Form
            action="/search"
            className="w-max-[200px] relative w-full lg:w-[166px] h-[36px]"
        >
            <Input
                key={searchParams?.get("q")}
                type="text"
                name="q"
                placeholder="Search"
                autoComplete="off"
                defaultValue={searchParams?.get("q") || ""}
                className="size-full bg-background"
            />
            <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <SearchIcon className="size-4 " />
            </div>
        </Form>
    );
}

export function SearchSkeleton() {
    return (
        <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
            <input
                placeholder="Search for products..."
                className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
            />
            <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <SearchIcon className="size-4" />
            </div>
        </form>
    );
}
