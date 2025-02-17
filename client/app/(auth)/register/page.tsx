import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./_components/register-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await getSession();
    if (session) redirect("/");
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-card">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-xl">
                    <div className="space-y-2 ">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Đăng ký
                        </h1>
                        <p className="text-sm text-muted">
                            Tạo tài khoản của bạn để bắt đầu
                        </p>
                        <RegisterForm />
                        <p className="text-center text-sm text-muted">
                            Đã có tài khoản?
                            <Link
                                className="font-semibold ml-3 text-foreground hover:underline"
                                href={"/login"}
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 relative min-h-screen">
                <Image
                    src="/opengraph-image.png"
                    alt="Biểu ngữ Trang chủ"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute max-w-lg space-y-6 text-white z-10 p-12">
                    <h2 className="text-4xl font-medium">
                        Tham gia với chúng tôi để khám phá trải nghiệm blog tốt
                        nhất
                    </h2>
                </div>
            </div>
        </div>
    );
}
