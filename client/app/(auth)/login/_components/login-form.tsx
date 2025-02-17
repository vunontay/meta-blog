"use client";
import SubmitButton from "@/components/custom/buttons/submit-button";
import PasswordField from "@/components/custom/inputs/password-field";
import TextField from "@/components/custom/inputs/text-field";
import { Icons } from "@/components/shared/icons";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/app/(auth)/login/action";
import { toast } from "sonner";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginUser, undefined);
    useEffect(() => {
        if (state?.message) {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <form action={formAction} className="space-y-4">
            <TextField
                defaultValue={state?.data?.email}
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
                label="Email"
                errorMessage={
                    state?.errors?.email && state.errors.email.join(", ")
                }
                icon={<Icons.Mail className="size-4 text-primary" />}
            />
            <PasswordField
                defaultValue={state?.data?.password}
                id="password"
                name="password"
                required
                type="password"
                placeholder="Nhập mật khẩu"
                label="Mật khẩu"
                errorMessage={
                    state?.errors?.password && state.errors.password.join(", ")
                }
            />
            <SubmitButton isLoading={isPending}>Đăng nhập</SubmitButton>
        </form>
    );
}
