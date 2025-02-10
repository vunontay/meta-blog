"use client";
import SubmitButton from "@/components/custom/buttons/submit-button";
import PasswordField from "@/components/custom/inputs/password-field";
import TextField from "@/components/custom/inputs/text-field";
import { Icons } from "@/components/shared/icons";

export default function LoginForm() {
    return (
        <form className="space-y-4">
            <TextField
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
                label="Email"
                // errorMessage={
                //     state.errors?.email && state.errors.email.join(", ")
                // }
                icon={<Icons.Mail className="size-4 text-primary" />}
            />
            <PasswordField
                id="password"
                name="password"
                required
                type="password"
                placeholder="Nhập mật khẩu"
                label="Mật khẩu"
                // errorMessage={
                //     state.errors?.password && state.errors.password.join(", ")
                // }
            />
            <SubmitButton isLoading={false}>Đăng nhập</SubmitButton>
        </form>
    );
}
