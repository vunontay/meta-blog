"use server";

import arcjet, { shield, detectBot, fixedWindow, request } from "@arcjet/next";
import { registrationSchema, type RegistrationData } from "@/lib/schema";
import { TActionResponse } from "@/types/server/action-type";
import userModel from "@/models/user-model";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: "LIVE", allow: [] }),
        fixedWindow({ mode: "LIVE", window: "1m", max: 5 }),
    ],
});

export async function registerUser(
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
        // Extract form data
        const rawData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        };
        // Validate input data
        const result = registrationSchema.safeParse(rawData);
        if (!result.success) {
            return {
                success: false,
                message: "Vui lòng sửa lỗi trong biểu mẫu",
                errors: result.error.flatten().fieldErrors,
            };
        }
        const validatedData: RegistrationData = result.data;

        // Connect to database and check if user exists
        await dbConnect();
        const existingUser = await userModel.findOne({
            email: validatedData.email,
        });
        if (existingUser) {
            return {
                success: false,
                message: `Tài khoản ${validatedData.email} đã tồn tại.`,
            };
        }

        // Hash password and create user
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(validatedData.password, salt);

        const newUser = await userModel.create({
            email: validatedData.email,
            username: validatedData.username,
            password: hashPassword,
            status: "active",
        });

        // Ensure user was created successfully
        if (!newUser) {
            return {
                success: false,
                message: "Tạo tài khoản không thành công.",
            };
        }

        return {
            success: true,
            message: "Đăng ký thành công!",
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
