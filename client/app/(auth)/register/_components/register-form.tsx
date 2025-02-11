"use client";
import { registerUser } from "@/app/(auth)/register/action";
import { Icons } from "@/components/shared/icons";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { TActionResponse } from "@/types/client/action-type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/custom/buttons/submit-button";
import PasswordField from "@/components/custom/inputs/password-field";
import TextField from "@/components/custom/inputs/text-field";

const initialState: TActionResponse<unknown> = {
    message: "",
    success: false,
    errors: undefined,
} as const;

export default function RegisterForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(registerUser, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            formRef.current?.reset();
            router.push("/login");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [router, state]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <form className="space-y-4" ref={formRef} onSubmit={handleSubmit}>
            <TextField
                id="username"
                name="username"
                placeholder="Tên người dùng"
                required
                label="Tên tài khoản"
                errorMessage={
                    state.errors?.username && state.errors.username.join(", ")
                }
                icon={<Icons.User className="size-4 text-primary" />}
            />
            <TextField
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
                label="Email"
                errorMessage={
                    state.errors?.email && state.errors.email.join(", ")
                }
                icon={<Icons.Mail className="size-4 text-primary" />}
            />
            <PasswordField
                id="password"
                name="password"
                required
                type="password"
                placeholder="Nhập mật khẩu"
                label="Mật khẩu"
                errorMessage={
                    state.errors?.password && state.errors.password.join(", ")
                }
            />
            <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                required
                type="password"
                placeholder="Nhập lại mật khẩu"
                label="Xác nhận mật khẩu"
                errorMessage={
                    state.errors?.confirmPassword &&
                    state.errors.confirmPassword.join(", ")
                }
            />
            <SubmitButton isLoading={isPending}>Đăng ký</SubmitButton>
        </form>
    );
}
