"use client";
import { registerUser } from "@/app/(auth)/register/action";
import SubmitButton from "@/components/custom/buttons/submit-button";
import PasswordField from "@/components/custom/inputs/password-field";
import TextField from "@/components/custom/inputs/text-field";
import { Icons } from "@/components/shared/icons";
import { registrationSchema } from "@/lib/schema";
import { useActionState, useState } from "react";

const initialState = {
    error: "",
    success: undefined,
} as const;

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(
        registerUser,
        initialState
    );
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string>
    >({});

    const handleSubmit = async (formData: FormData) => {
        setValidationErrors({});

        const data = {
            username: formData.get("username")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || "",
            confirmPassword: formData.get("confirmPassword")?.toString() || "",
        };

        const result = registrationSchema.safeParse(data);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                const field = error.path[0].toString();
                errors[field] = error.message;
            });
            setValidationErrors(errors);
            return; // Dừng lại nếu dữ liệu không hợp lệ.
        }

        await formAction(formData);
    };

    return (
        <form className="space-y-4" action={handleSubmit}>
            <TextField
                id="username"
                name="username"
                placeholder="Tên người dùng"
                required
                label="Tên tài khoản"
                errorMessage={state.error || validationErrors.username}
                icon={<Icons.User className="size-4 text-primary" />}
            />
            <TextField
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
                label="Email"
                errorMessage={state.error || validationErrors.email}
                icon={<Icons.Mail className="size-4 text-primary" />}
            />
            <PasswordField
                id="password"
                name="password"
                required
                type="password"
                placeholder="Nhập mật khẩu"
                label="Mật khẩu"
                errorMessage={state.error || validationErrors.password}
            />
            <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                required
                type="password"
                placeholder="Nhập lại mật khẩu"
                label="Xác nhận mật khẩu"
                errorMessage={state.error || validationErrors.confirmPassword}
            />
            <SubmitButton isLoading={isPending}>Đăng ký</SubmitButton>
        </form>
    );
}
