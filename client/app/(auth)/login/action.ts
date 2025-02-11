"use server";
import arcjet, { shield, detectBot, fixedWindow, request } from "@arcjet/next";
import { TActionResponse } from "@/types/server/action-type";
import { LoginData, loginSchema } from "@/lib/schema";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongoose";
import userModel from "@/models/user-model";
import bcrypt from "bcryptjs";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: "LIVE", allow: [] }),
        fixedWindow({ mode: "LIVE", window: "1m", max: 5 }),
    ],
});

export async function LoginUser(
    _prevState: TActionResponse<unknown>,
    formData: FormData
): Promise<TActionResponse<unknown>> {
    const req = await request();
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return {
                success: false,
                message: "Quá nhiều lần đăng ký. Vui lòng thử lại sau.",
            };
        }
        if (decision.reason.isBot()) {
            return {
                success: false,
                message: "Bạn là bot. Vui lòng dừng lại.",
            };
        }
        return {
            success: false,
            message: "Đã xảy ra lỗi trong quá trình đăng ký.",
        };
    }

    try {
        const rawData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        const result = loginSchema.safeParse(rawData);
        if (!result.success) {
            return {
                success: false,
                message: "Vui lòng sửa lỗi trong biểu mẫu",
                errors: result.error.flatten().fieldErrors,
            };
        }
        const validatedData: LoginData = result.data;
        await dbConnect();
        const user = await userModel.findOne({ email: validatedData.email });
        if (!user)
            return { success: false, message: "Tài khoản không tồn tại" };

        const isPasswordMatch = await bcrypt.compare(
            validatedData.password,
            user.password
        );
        if (!isPasswordMatch)
            return { success: false, message: "Mật khẩu không đúng" };

        const userToken = await new SignJWT({
            user_id: user._id.toString(),
            email: user.email,
            userName: user.name,
            is_premium: user.isPremium,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        (await cookies()).set("token", userToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7200,
            path: "/",
        });

        return {
            success: true,
            message: "Đăng nhập thành công",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi khi đăng ký",
        };
    }
}
