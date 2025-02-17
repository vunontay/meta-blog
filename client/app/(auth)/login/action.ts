"use server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import userModel from "@/models/user-model";
import arcjet, { shield, detectBot, fixedWindow, request } from "@arcjet/next";
import { loginSchema, LoginData } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TActionState } from "@/types/server/action-type";
import { createSession } from "@/lib/session";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: "LIVE", allow: [] }),
        fixedWindow({ mode: "LIVE", window: "1m", max: 5 }),
    ],
});

export async function loginUser(
    _prevState: TActionState<LoginData>,
    formData: FormData
): Promise<TActionState<LoginData>> {
    const req = await request();
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return {
                message: "Quá nhiều lần đăng ký. Vui lòng thử lại sau.",
            };
        }
        if (decision.reason.isBot()) {
            return {
                message: "Bạn là bot. Vui lòng dừng lại.",
            };
        }
        return {
            message: "Đã xảy ra lỗi trong quá trình đăng ký.",
        };
    }

    const formObject = Object.fromEntries(formData.entries()) as LoginData;

    const validationResult = loginSchema.safeParse(formObject);
    if (!validationResult.success) {
        return {
            data: formObject,
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    await dbConnect();

    const user = await userModel.findOne({
        email: validationResult.data.email,
    });
    if (!user) {
        return {
            data: formObject,
            message: "Tài khoản không hợp lệ",
        };
    }

    const isPasswordMatch = await bcrypt.compare(
        validationResult.data.password,
        user.password
    );
    if (!isPasswordMatch) {
        return {
            data: formObject,
            message: "Mật khẩu không đúng",
        };
    }

    await createSession({
        user_id: user._id.toString(),
        email: user.email,
        userName: user.name,
        is_premium: user.isPremium,
    });

    revalidatePath("/");
    redirect("/");
}
