"use server";
import arcjet, { shield, detectBot, fixedWindow, request } from "@arcjet/next";
import { registrationSchema, type RegistrationData } from "@/lib/schema";

type RegisterResponse = {
    error?: string;
    success?: string;
};
const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: [],
        }),
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 5,
        }),
    ],
});
export async function registerUser(
    _prevState: RegisterResponse,
    formData: FormData
): Promise<RegisterResponse> {
    const req = await request();
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return {
                error: "Quá nhiều lần đăng ký. Vui lòng thử lại sau.",
            };
        }
        if (decision.reason.isBot()) {
            return {
                error: "Bạn là bot. Vui lòng dừng lại.",
            };
        }
        return {
            error: "Đã xảy ra lỗi trong quá trình đăng ký.",
        };
    }
    const data = {
        username: formData.get("username") || "",
        email: formData.get("email") || "",
        password: formData.get("password") || "",
        confirmPassword: formData.get("confirmPassword") || "",
    };
    try {
        const result = registrationSchema.safeParse(data);
        if (!result.success) {
            return {
                error: result.error.errors[0].message,
            };
        }

        const validatedData: RegistrationData = result.data;

        // Đây là nơi bạn thường lưu người dùng vào CSDL.
        console.log("CSDL sẽ đăng ký:", validatedData);

        return {
            success: "Đăng ký thành công!",
        };
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return {
            error: "Đã xảy ra lỗi trong quá trình đăng ký.",
        };
    }
}
