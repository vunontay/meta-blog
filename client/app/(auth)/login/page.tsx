import Image from "next/image";
import Link from "next/link";
import LoginForm from "./_components/login-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/");
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-card">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-xl">
                    <div className="space-y-2 ">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Đăng Nhập
                        </h1>
                        <p className="text-sm text-muted">
                            Vui lòng đăng nhập vào tài khoản của bạn để tiếp
                            tục.
                        </p>
                        <LoginForm />
                        <p className="text-center text-sm text-muted">
                            Chưa có tài khoản?
                            <Link
                                className="font-semibold ml-3 text-foreground hover:underline"
                                href={"/register"}
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 relative min-h-screen">
                <Image
                    src="/opengraph-image.png"
                    alt="Biểu ngữ Đăng nhập"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute max-w-lg space-y-6 text-white z-10 p-12">
                    <h2 className="text-4xl font-medium">
                        Chào mừng trở lại! Đăng nhập để trải nghiệm những điều
                        tuyệt vời.
                    </h2>
                </div>
            </div>
        </div>
    );
}
