import { z } from "zod";

export const registrationSchema = z
    .object({
        username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
        email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Mật khẩu phải chứa ít nhất một chữ cái in hoa, một chữ cái in thường và một số"
            ),

        confirmPassword: z.string().min(8, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

export type RegistrationData = z.infer<typeof registrationSchema>;
