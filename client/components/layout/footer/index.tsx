import FooterMenu from "@/components/layout/footer/footer-menu";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MENU } from "@/constants/server/category-constant";
import { MENU } from "@/constants/server/menu-constant";
import { Mail } from "lucide-react";
import { Suspense } from "react";
import Form from "next/form";

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
    const copyrightName = "JS Template";
    const skeleton =
        "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
    return (
        <footer className="bg-card">
            <Container>
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    <div>
                        <div className="text-md font-semibold text-foreground">
                            About
                        </div>
                        <p className="pt-3 font-normal text-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                        <div className="pt-3 text-foreground">
                            <span className="font-semibold">Email:</span>{" "}
                            <span>info@jstemplate.net</span>
                        </div>
                        <div className="text-foreground">
                            <span className="font-semibold">Phone:</span>{" "}
                            <span>880 123 456 789</span>
                        </div>
                    </div>
                    <div className="flex justify-around flex-wrap">
                        <div className="flex flex-col flex-1">
                            <Suspense
                                fallback={
                                    <div className="flex h-[236px] w-[90px] flex-col gap-2">
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                    </div>
                                }
                            >
                                <div className="text-md font-semibold text-foreground">
                                    Quick Link
                                </div>
                                <div className="pt-3">
                                    {" "}
                                    <FooterMenu menu={MENU} />
                                </div>
                            </Suspense>
                        </div>
                        <div className="flex flex-col flex-1">
                            <Suspense
                                fallback={
                                    <div className="flex h-[236px] w-[90px] flex-col gap-2">
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                        <div className={skeleton} />
                                    </div>
                                }
                            >
                                <div className="text-md font-semibold text-foreground">
                                    Category
                                </div>
                                <div className="pt-3">
                                    {" "}
                                    <FooterMenu menu={CATEGORY_MENU} />
                                </div>
                            </Suspense>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl flex flex-col items-center gap-[30px] p-8">
                        <div className="text-center">
                            <div className="text-md font-semibold text-foreground">
                                Weekly Newsletter
                            </div>
                            <p className="font-normal text-foreground pt-2">
                                Get blog articles and offers via email
                            </p>
                        </div>
                        <div className="pt-[30px] w-full">
                            <Suspense fallback={null}>
                                <Form
                                    action="/"
                                    className="relative w-full h-[48px]"
                                >
                                    <Input
                                        type="text"
                                        name="sendEmail"
                                        placeholder="Your Email"
                                        autoComplete="off"
                                        className="size-full bg-background"
                                    />
                                    <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                                        <Mail className="size-4 " />
                                    </div>
                                </Form>
                            </Suspense>
                            <Button className="w-full h-[48px] mt-2">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="py-8 border-t border-secondary ">
                    <div className="flex w-full flex-col items-center md:flex-row gap-4">
                        <p>
                            &copy; {copyrightDate} {copyrightName}
                            {copyrightName.length &&
                            !copyrightName.endsWith(".")
                                ? "."
                                : ""}{" "}
                            All rights reserved.
                        </p>

                        <p className="md:ml-auto flex gap-4">
                            <a
                                className="text-foreground hover:underline"
                                href=""
                            >
                                Terms of Use
                            </a>
                            <a
                                className="text-foreground hover:underline"
                                href=""
                            >
                                Privacy Policy
                            </a>
                            <a
                                className="text-foreground hover:underline"
                                href=""
                            >
                                Cookie Policy
                            </a>
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
